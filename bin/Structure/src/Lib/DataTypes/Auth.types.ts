export type UserLoginRequest = {
    email: string,
    password: string
}

export type UserRegisterRequest = {
    firstName: string
    lastName:string
    email: string
    password: string
    image?: string
    age: number
}

export type UserLoginResponse = {
    token?: string
}

export type UserRegisterResponse = UserLoginResponse