import { Response } from "express";

const errorResponse = (res: Response, error: object, statusCode: number, data: object, message: string) => {
    return res.status(statusCode).json({
        error,
        data,
        message,
        status: 'error'
    });
};

export default {
    errorResponse,
};
