import mongoose, { Document, Schema } from "mongoose"
import type { CommonModelType, UserModelType } from "../Lib/DataTypes/Models/User"
import passwordHash from "password-hash"

const UserSchema = new Schema<UserModelType<CommonModelType & Document>>({
	firstName: {
		type: String,
		required: true,
		unique: true
	},
	lastName: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: String,
	image: {
		type: String,
		default: "https://e7.pngegg.com/pngimages/867/694/png-clipart-user-profile-default-computer-icons-network-video-recorder-avatar-cartoon-maker-blue-text.png"
	},
	token: String,
	createdOn: {
		type: Date,
		default: new Date()
	},
	updatedOn: {
		type: Date,
		default: new Date()
	}
})

UserSchema.methods.comparePassword = function (candidatePassword: string): boolean {
	return passwordHash.verify(candidatePassword, this.password)
}

const UserModel = mongoose.model<UserModelType<CommonModelType & Document>>("User", UserSchema)
export default UserModel