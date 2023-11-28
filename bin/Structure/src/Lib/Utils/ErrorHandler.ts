import { Response } from "express"
import mongoose from "mongoose"
import { Validator } from "node-input-validator"
import { Res } from "../DataTypes/Common"
import { ResponseCode } from "./ResponseCode"

export const dbError = (error: any, res: Response<Res<any>>): void => {
	switch (true) {
		case error.code === 11000: {
			const keyPattern = /index: .*?\.(.*?)_.*? dup key:/
			const matches = error.message.match(keyPattern)

			const duplicateField = matches && matches[1] ? matches[1] : "unknown"

			res.status(ResponseCode.DUPLICATE_KEY_ERROR).json({
				status: false,
				message: `Duplicate key error on field: ${duplicateField}`,
				error: error
			})
			break
		}

		case error instanceof mongoose.Error.ValidationError: {
			const errors: Array<string> = []

			for (const field in error.errors) {
				if (Object.prototype.hasOwnProperty.call(error.errors, field)) {
					errors.push(error.errors[field].message)
				}
			}

			res.status(ResponseCode.VALIDATION_ERROR).json({
				status: false,
				error: errors,
				message: errors[0]
			})
			break
		}

		case error instanceof mongoose.Error.CastError: {
			res.status(ResponseCode.BAD_REQUEST).json({
				status: false,
				message: `Invalid ${error.kind}: ${error.value}`,
				error: error
			})
			break
		}

		default: {
			res.status(ResponseCode.SERVER_ERROR).json({
				status: false,
				message: "Internal Server Error",
				error: error
			})
			break
		}
	}
}

export const InputValidator = async (input: object, rules: object): Promise<void> => {
	return new Promise((resolve, reject) => {
		const v = new Validator(input, rules)

		v.check()
			.then((match: boolean) => {
				if (!match) {
					const error = (Object.values(v.errors)[0] as any).message
					reject(error)
				} else {
					resolve()
				}
			})
			.catch((error) => {
				reject(error)
			})


	})
}