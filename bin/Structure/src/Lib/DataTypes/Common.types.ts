type BaseRes = {
    message: string;
};

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
    _id: string;
    email: string;
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
