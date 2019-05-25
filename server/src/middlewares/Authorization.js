import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import response from '../helpers/response';
import models from '../models';

const { User } = models;
config();

class Authorization {
    static getToken(req) {
        const bearerToken = req.headers.authorization;
        const token = bearerToken && bearerToken.replace('Bearer ', '');

        return token;
    }

    static generateToken(user) {
        const token = jwt.sign({ user },
            process.env.SECRET, {
                expiresIn: '24h',
            });

        return token;
    }

    static async authorize(req, res, next) {
        const token = await Authorization.getToken(req);

        if (!token) response.errorResponse(res, 401, 'Unauthorized access');

        jwt.verify(token, process.env.SECRET, async (err, decoded) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    return response.errorResponse(res, 401, 'Token is expired');
                }

                return response.errorResponse(res, 401, 'Failed to authenticate token');
            }

            const foundUser = await User.findOne({ where: { id: decoded.user.id } });

            if (!foundUser) response.errorResponse(res, 401, 'Unauthorized access');

            req.user = decoded.user;

            return next();
        });
    }

    static async authorizeAdmin(req, res, next) {
        const userId = req.user.id;

        User.findOne({
            where: { id: userId, isAdmin: true }
        }).then(async (user) => {
            if (!user) await response.errorResponse(res, 403, 'Unauthorized access, Admin only!');
            next();
        }).catch(error => response.errorResponse(res, 500, error));
    }
}

export default Authorization;
