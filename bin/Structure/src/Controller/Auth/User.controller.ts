import { Request, Response } from "express"
import UserModel, { UserModelType } from "../../Model/User.model"
import passwordHash from "password-hash"
import mongoose, { Document } from "mongoose"
import jwt from "jsonwebtoken"
import { InputValidator, dbError } from "../../Lib/Utils/ErrorHandler"
import { Res } from "../../Lib/DataTypes/Common.types"
import { ResponseCode } from "../../Lib/Utils/ResponseCode"
import { UserLoginRequest, UserLoginResponse, UserRegisterRequest, UserRegisterResponse } from "../../Lib/DataTypes/Auth.types"


const createToken = (data: Record<string, any>): string => {
	return jwt.sign(data, process.env.JWT_SECRET ?? "")
}

const login = (req: Request<any, any, UserLoginRequest>, res: Response<Res<UserLoginResponse>>): void => {
	const { email, password } = req.body

	UserModel.findOne({ email })
		.then((result) => {
			if (result && result.comparePassword && result.comparePassword(password)) {
				const response: Res<UserLoginResponse> = {
					data: {
						token: result.token
					},
					status: true,
					message: "Success"
				}
				res.status(ResponseCode.SUCCESS).json(response)
			} else {
				res.status(ResponseCode.NOT_FOUND_ERROR).json({
					status: false,
					message: "No admin found"
				})
			}
		})
		.catch((error) => {
			dbError(error, res)
		})
}

const register = (req: Request<any, any, UserRegisterRequest>, res: Response<Res<UserRegisterResponse>>): void => {
	InputValidator(req.body, {
		email: "required|email",
		password: "required|minLength:6",
		firstName: "required",
		lastName: "required",
		age: "required"
	})
		.then(() => {
			const _id = new mongoose.Types.ObjectId()
			const userData: UserModelType<{ _id: mongoose.Types.ObjectId }> = {
				...req.body,
				password: passwordHash.generate(req.body.password, { saltLength: 10 }),
				token: createToken({ _id, email: req.body.email }),
				_id
			}
			const userModel = new UserModel(userData)

			userModel.save()
				.then(() => {
					const response: Res<UserRegisterResponse> = {
						data: {
							token: userData.token ?? ''
						},
						status: true,
						message: "Success"
					}
					res.status(ResponseCode.SUCCESS).json(response)
				})
				.catch((error) => {
					dbError(error, res)
				})
		})
		.catch((error) => {
			res.status(ResponseCode.VALIDATION_ERROR).json({
				status: false,
				message: error
			})
		})
}

const UserAuthController = {
	login,
	register
}

export default UserAuthController