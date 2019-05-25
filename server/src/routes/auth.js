import express from 'express';
import ValidationHandler from '../middlewares/ValidationHandler';
import UserController from '../controllers/UserController';
import authValidation from '../validations/authValidation';
import Authorization from '../middlewares/Authorization';
import trim from '../middlewares/trim';

const userRoutes = express.Router();
const validation = [ValidationHandler.validate, trim, ValidationHandler.isEmptyReq];

userRoutes.post('/signup', authValidation.signup, validation, UserController.signup);
userRoutes.post('/login', authValidation.login, validation, UserController.login);
userRoutes.post('/forgot_password', authValidation.forgotPassword, validation, UserController.forgotPassword);
userRoutes.post('/reset_password', authValidation.resetPassword, validation, UserController.resetPassword);
userRoutes.get('/refresh_token', Authorization.authorize, UserController.refreshToken);

export default userRoutes;
