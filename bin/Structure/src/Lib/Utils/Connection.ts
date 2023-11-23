import mongoose from "mongoose"

export const connectDB = (): void => {
	const mongoURI: string = process.env.MONGODB_URI ?? "mongodb://localhost:27017/mydatabase"

	mongoose.connect(mongoURI)
		.then(() => {
			console.log("MongoDB connected")
		})
		.catch((error) => {
			console.error("MongoDB connection error:", error)
		})
}