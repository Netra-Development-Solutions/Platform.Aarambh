import { Request, Response, NextFunction } from 'express';
const jwt = require('@netra-development-solutions/utils.crypto.jsonwebtoken');
import NDSresponse from './Utils/Response';

const authorizationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    interface AuthenticatedRequest extends Request {
        user?: any;
        token?: string;
    }

    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return NDSresponse.errorResponse(res, {}, 401, {}, 'Unauthorized');
        }

        if (jwt.verify(token)) {
            const decoded = jwt.decode(token);
            (req as AuthenticatedRequest).user = decoded;
            (req as AuthenticatedRequest).token = token;
        } else {
            return NDSresponse.errorResponse(res, {}, 401, {}, 'Unauthorized');
        }

        return next();
    } catch (error: any) {
        return NDSresponse.errorResponse(res, error, 500, {}, 'Internal Server Error');
    }
};

export default authorizationMiddleware;