export type CommonModelType = {
    createdOn?: Date
    updatedOn?: Date
    isDeleted?: boolean
}

export type UserModelType<T> = T & {
    firstName: string
    lastName: string
    email: string
    password: string
    token: string
    image?: string
    age: number,
    comparePassword?(candidatePassword: string): boolean
}