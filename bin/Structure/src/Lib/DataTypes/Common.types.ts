type BaseRes = {
    message: string;
};

export type UserTypes = 'ADMIN' | 'SERVICE-PROVIDER' | 'STREET-VENDOR' | 'USER' | 'SELLER'

interface ResSuccess<T> extends BaseRes {
    status: true;
    data: T;
    pagination?: {
        total: number;
        currentPage: number;
        totalPages: number;
    };
    error?: never;
}

interface ResError extends BaseRes {
    status: false;
    data?: never;
    error?: any;
}

export type Res<T = any> = ResSuccess<T> | ResError;

export type ReqWithAuth<T = Record<string, any>> = T & {
    id: string;
    userType: UserTypes;
};

export type CommonModelType = {
    createdAt?: Date;
    updatedAt?: Date;
    isDeleted?: boolean;
}

declare module 'express' {
    interface Request {
        User?: ReqWithAuth;
    }
}
