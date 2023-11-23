import { ReqWithAuth } from "./src/Lib/DataTypes/Common"

// Augment the Request interface to include the custom property
declare module "express" {
    interface Request {
        User?: ReqWithAuth;
    }
}