import express, { Application } from "express"
import { configDotenv } from "dotenv"
import { connectDB } from "./Lib/Utils/Connection"
import Route from "./Routes/Index"
import logger from "morgan"

configDotenv()

const app: Application = express()
const port = process.env.PORT ?? 3000

connectDB()

app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use("/api/v1", Route)

app.listen(port, () => {
	console.log(`Server is running on port http://127.0.0.1:${port}`)
})
