export type Res<T = Record<string, any>> = {
    status: boolean
    data?: T
    message: string
    error?: any
}

export type ReqWithAuth<T = Record<string, any>> = T & {
    _id: string,
    email: string
}

declare module "express" {
    interface Request {
        User?: ReqWithAuth;
    }
}
