import { Router } from "express"
import UserProfileController from "../Controller/User/Profile.controller"

const UserRouter: Router = Router()

UserRouter.get("/profile", UserProfileController.getUserProfile)

export default UserRouter