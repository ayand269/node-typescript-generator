import { Response } from "express"
import mongoose from "mongoose"
import { Validator } from "node-input-validator"
import { Res } from "../DataTypes/Common"

export const dbError = (error: any, res: Response<Res<any>>): void => {
	switch (true) {
		case error.code === 11000: {
			const keyPattern = /index: .*?\.(.*?)_.*? dup key:/
			const matches = error.message.match(keyPattern)

			const duplicateField = matches && matches[1] ? matches[1] : "unknown"

			res.status(409).json({
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

			res.status(422).json({
				status: false,
				error: errors,
				message: errors[0]
			})
			break
		}

		case error instanceof mongoose.Error.CastError: {
			res.status(400).json({
				status: false,
				message: `Invalid ${error.kind}: ${error.value}`,
				error: error
			})
			break
		}

		default: {
			res.status(500).json({
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