/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import randomString from 'random-string';
import { Op } from 'sequelize';
import models from '../models';
import Authorization from '../middlewares/Authorization';
import getUserObject from '../helpers/getUserObject';
import response from '../helpers/response';
import verifyPassword from '../helpers/verifyPassword';
import Mailer from '../utils/Mailer';

const { User } = models;


/**
 * @exports
 * @class UserController
 */
class UserController {
    /**
   * Registers a new user
   * @method register
   * @memberof UserController
   * @param {object} req
   * @param {object} res
   * @returns {(function|object)} Function next() or JSON object
   */
    static async signup(req, res) {
        const {
            firstname,
            lastname,
            email,
            password,
            confirm_password,
        } = req.body;

        await User.create({
            firstname,
            lastname,
            email: email.toLowerCase(),
            password,
        }).then((user) => {
            const token = Authorization.generateToken(UserController.tokenObj(user));
            // eslint-disable-next-line no-param-reassign
            user = getUserObject(user);
            response.successResponse(res, 201, { token, user });
        });
    }

    /**
   * Logs in a user
   * @method login
   * @memberof UserController
   * @param {object} req
   * @param {object} res
   * @returns {(function|object)} Function next() or JSON object
   */
    static async login(req, res) {
        const { email, password } = req.body;

        await User.findOne({ where: { email } })
            .then(async (user) => {
                verifyPassword(password, user.dataValues.password).then((verify) => {
                    if (!verify) {
                        response.errorResponse(res, 401, 'Email/Password does not match');
                    }

                    const token = Authorization.generateToken(UserController.tokenObj(user));
                    user = getUserObject(user);

                    response.successResponse(res, 200, { token, user });
                });
            });
    }

    /**
   * Sends password token to user
   * @method forgotPassword
   * @memberof UserController
   * @param {object} req
   * @param {object} res
   * @returns {(function|object)} Function next() or JSON object
   */
    static async forgotPassword(req, res) {
        const { email } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ error: 'This user is not registered on the platform, please signup instead' });

        const token = randomString({ length: 40 });

        await user.update({
            passwordResetToken: token,
            passwordTokenExpiry: Date.now() + 3600000 // 1 hour from now
        });

        await Mailer.forgotPasswordMail(token, email);

        return res.status(200).json({ message: 'A reset token has been sent to your email address' });
    }

    /**
   * Sends password token to user
   * @method resetPassword
   * @memberof UserController
   * @param {object} req
   * @param {object} res
   * @returns {(function|object)} Function next() or JSON object
   */
    static async resetPassword(req, res) {
        const { password } = req.body;
        const { email, token } = req.query;

        const user = await User.findOne({
            where: {
                passwordResetToken: token,
                passwordTokenExpiry: {
                    [Op.gt]: Date.now()
                }
            }
        });

        if (!user) return res.status(400).send({ error: 'Password reset token is invalid or has expired' });

        await user.update({
            password,
            passwordResetToken: null,
            passwordTokenExpiry: null,
        });

        await Mailer.resetPasswordMail(email);

        return res.status(200).json({ message: 'Password reset successful' });
    }

    static async updateUserDetails(req, res) {
        const userId = req.user.id;
        const { othername, phoneNo, avatar } = req.body;

        await User.findOne({
            where: { id: userId }
        }).then((user) => {
            user.update({
                othername: othername || user.othernamee,
                phoneNo: phoneNo || user.phoneNo,
                avatar: avatar || user.avatar
            }).then(updatedUser => response.successResponse(res, 200, getUserObject(updatedUser)));
        });
    }

    static async refreshToken(req, res) {
        const authUser = await models.User.findOne({ where: { email: req.user.email } });
        const user = getUserObject({ ...authUser.dataValues });
        const token = Authorization.generateToken(user);

        return res.status(200).json({ user, token });
    }


    static tokenObj(user) {
        return {
            id: user.id,
            email: user.email,
            isAdmin: user.isAdmin
        };
    }
}

export default UserController;
