import mongoose, { Document, Schema } from 'mongoose';
import passwordHash from 'password-hash';

export type UserModelType<T = Record<string, any>> = T & {
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    image?: string;
    token?: string;
    comparePassword?: (candidatePassword: string) => boolean;
    createdAt?: Date;
    updatedAt?: Date;
};

const UserModelSchema = new Schema<UserModelType<Document>>(
    {
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
            default:
                'https://e7.pngegg.com/pngimages/867/694/png-clipart-user-profile-default-computer-icons-network-video-recorder-avatar-cartoon-maker-blue-text.png'
        },
        token: String
    },
    { timestamps: true }
);

UserModelSchema.methods.comparePassword = function (candidatePassword: string): boolean {
    return passwordHash.verify(candidatePassword, this.password);
};

const UserModel = mongoose.model<UserModelType<Document>>('User', UserModelSchema);
export default UserModel;
