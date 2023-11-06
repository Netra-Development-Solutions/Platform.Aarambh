import { Request, Response, NextFunction } from 'express';
const jwt = require('@netra-development-solutions/utils.crypto.jsonwebtoken');
const { errorResponse } = require('./Utils/Response');

const authorizationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    interface AuthenticatedRequest extends Request {
        user?: any;
        token?: string;
    }

    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return errorResponse(res, {}, 401, {}, 'Unauthorized');
        }

        if (jwt.verify(token)) {
            const decoded = jwt.decode(token);
            (req as AuthenticatedRequest).user = decoded;
            (req as AuthenticatedRequest).token = token;
        } else {
            return errorResponse(res, {}, 401, {}, 'Unauthorized');
        }

        return next();
    } catch (error) {
        return errorResponse(res, error, 500, {}, 'Internal Server Error');
    }
};

export default authorizationMiddleware;