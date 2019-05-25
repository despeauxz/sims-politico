import { check } from 'express-validator/check';
import notEmpty from '../helpers/notEmpty';
import models from '../models';

export default {
    createParty: [
        check('name')
            .trim()
            .exists().withMessage('Name must be specified')
            .custom(value => notEmpty(value, 'Name field cannot be left blank')),
        check('hqAddress')
            .trim()
            .exists().withMessage('HQ Address must be specified')
            .custom(value => notEmpty(value, 'HQ Address field cannot be left blank')),
        check('fullname')
            .trim()
            .exists().withMessage('Fullname must be specified')
            .custom(value => notEmpty(value, 'Fullname field cannot be left blank')),
        check('logoUrl')
            .trim()
            .exists().withMessage('Logo URL must be specified')
            .isURL()
            .withMessage('Logo URL must be a URL'),
    ],
    update: [
        check('name')
            .trim()
            .custom(value => notEmpty(value, 'Name field cannot be left blank'))
            .custom(value => models.Party.findOne({ where: { name: value } }).then((party) => {
                if (party !== null) {
                    throw new Error('Party name has to be unique');
                }
            })),
        check('fullname')
            .trim()
            .custom(value => notEmpty(value, 'Name field cannot be left blank')),
    ],
};
