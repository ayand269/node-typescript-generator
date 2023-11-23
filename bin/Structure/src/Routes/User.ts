import { Router } from "express"
import UserController from "../Controller/User"

const UserRouter: Router = Router()

UserRouter.get("/profile", UserController.getUserProfile)

export default UserRouter