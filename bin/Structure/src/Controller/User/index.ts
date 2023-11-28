import { Request, Response } from "express"
import UserModel from "../../Model/User"
import { Res } from "../../Lib/DataTypes/Common"
import { UserProfileType } from "../../Lib/DataTypes/Responses/User"
import { dbError } from "../../Lib/Utils/ErrorHandler"
import mongoose from "mongoose"
import { ResponseCode } from "../../Lib/Utils/ResponseCode"

const getUserProfile = (req: Request, res: Response<Res<UserProfileType>>): void => {
	UserModel.aggregate([
		{
			$match: {
				_id: new mongoose.Types.ObjectId(req.User?._id)
			}
		},
		{
			$project: {
				__v: 0,
				token: 0,
				createdOn: 0,
				updatedOn: 0,
				isDeleted: 0,
				password: 0
			}
		}
	])
		.then((result: Array<UserProfileType>) => {
			res.status(ResponseCode.SUCCESS).json({
				status: true,
				data: result[0],
				message: "Successfully Get UserProfile"
			})
		})
		.catch((error) => {
			dbError(error, res)
		})
}

const UserController = {
	getUserProfile
}

export default UserController