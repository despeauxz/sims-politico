import express from 'express';
import ValidationHandler from '../middlewares/ValidationHandler';
import UserController from '../controllers/UserController';
import userValidation from '../validations/userValidation';
import trim from '../middlewares/trim';
import Authorization from '../middlewares/Authorization';

const userRoutes = express.Router();
const validation = [ValidationHandler.validate, trim, ValidationHandler.isEmptyReq];
userRoutes.use(Authorization.authorize);

userRoutes.patch('/user/details', UserController.updateUserDetails);

export default userRoutes;
