import { check } from 'express-validator/check';
import notEmpty from '../helpers/notEmpty';

export default {
    userDetails: [
        check('othername')
            .trim()
            .optional()
            .exists()
            .withMessage('Other name must be specific')
            .custom(value => notEmpty(value, 'Othername field cannot be left blank')),
        check('phoneNo')
            .trim()
            .optional()
            .exists()
            .withMessage('Firstname must be specific')
            .isMobilePhone()
            .withMessage('Must be a Mobile number')
            .custom(value => notEmpty(value, 'Firstname field cannot be left blank')),
        check('avatar')
            .trim()
            .optional()
            .exists()
            .withMessage('Avatar must be specific')
            .custom(value => notEmpty(value, 'Avatar field cannot be left blank')),
    ]
};
