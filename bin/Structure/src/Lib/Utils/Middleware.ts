import { NextFunction, Request, Response } from "express"
import jwt, { JwtPayload } from "jsonwebtoken"
import { Res } from "../DataTypes/Common"

export const middleware = (req: Request, res: Response<Res>, next: NextFunction): void => {
	const authorization: string | undefined = req.headers.authorization

	if (!authorization) {
		res.status(322).json({
			status: false,
			message: "No credentials sent!"
		})
	} else {
		try {
			const decrypted = jwt.verify(authorization, process.env.JWT_SECRET ?? "") as JwtPayload
			req.User = {
				_id: decrypted._id,
				email: decrypted.email
			}

			next()
		} catch (error) {
			res.status(322).json({
				status: false,
				message: "Auth error!"
			})
		}
	}
}