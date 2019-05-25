import { check } from 'express-validator/check';
import notEmpty from '../helpers/notEmpty';
import models from '../models';

export default {
    signup: [
        check('firstname')
            .trim()
            .exists()
            .withMessage('Firstname must be specific')
            .custom(value => notEmpty(value, 'Firstname field cannot be left blank')),
        check('lastname')
            .trim()
            .exists()
            .withMessage('Lastname must be specific')
            .custom(value => notEmpty(value, 'Lastname field cannot be left blank')),
        check('email')
            .trim()
            .exists()
            .withMessage('Email must be specific')
            .custom(value => notEmpty(value, 'email field cannot be left blank'))
            .isEmail()
            .withMessage('Please input a valid email address')
            .custom(value => models.User.findOne({ where: { email: value } }).then((user) => {
                if (user !== null) {
                    throw new Error('This Email has already been taken');
                }
            })),
        check('password')
            .trim()
            .exists().withMessage('Password field is required')
            .isLength({ min: 6 })
            .withMessage('Password must be atleaset 6 characters'),
        check('confirm_password', 'Passwords don\'t match')
            .trim()
            .custom(value => notEmpty(value, 'Password Confirm field field cannot be left blank'))
            .custom((value, { req }) => value === req.body.password),
    ],
    login: [
        check('email')
            .exists().withMessage('Email must be specified')
            .isEmail()
            .withMessage('Please enter a valid email address.')
            .custom(value => models.User.findOne({ where: { email: value } }).then((user) => {
                if (user === null) {
                    throw new Error('This account doesn\'t exist, please Sign Up Instead');
                }

                return true;
            }))
            .trim()
            .normalizeEmail(),
        check('password')
            .trim()
            .exists().withMessage('Password field is required')
            .isLength({ min: 3 })
            .withMessage('Please enter a valid password.'),
    ],
    forgotPassword: [
        check('email')
            .exists().withMessage('Email must be specified')
            .isEmail()
            .withMessage('Please enter a valid email address.')
    ],
    resetPassword: [
        check('password')
            .exists().withMessage('Password must be specified')
            .custom(value => notEmpty(value, 'Password field cannot be left blank'))
            .isLength({ min: 8 })
            .withMessage('Password must be at least 8 characters'),
        check('confirm_password', 'Password don\'t match')
            .trim()
            .custom(value => notEmpty(value, 'Confirm password field cannot be empty'))
            .custom((value, { req }) => value === req.body.password),
    ]
};
