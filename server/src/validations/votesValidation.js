import { check } from 'express-validator/check';
import models from '../models';
import notEmpty from '../helpers/notEmpty';

const { Office, Party, Candidates } = models;

export default {
    candidates: [
        check('officeId')
            .exists()
            .withMessage('Office ID must be specific')
            .custom(value => notEmpty(value, 'Office ID field cannot be left blank'))
            .isNumeric()
            .withMessage('Office ID must be an Integer')
            .custom(value => Office.findOne({ where: { id: value } }).then((office) => {
                if (office === null) {
                    throw new Error('Office does not exists');
                }
            })),
        check('partyId')
            .exists()
            .withMessage('Party Id must be specific')
            .custom(value => notEmpty(value, 'Party ID field cannot be left blank'))
            .isNumeric()
            .withMessage('Party ID must be an Integer')
            .custom(value => Party.findOne({ where: { id: value } }).then((party) => {
                if (party === null) {
                    throw new Error('Party does not exists');
                }
            })),
    ],
    votes: [
        check('officeId')
            .custom(value => notEmpty(value, 'Office ID field cannot be left blank'))
            .isNumeric()
            .withMessage('Office ID must be an Integer')
            .custom(value => Office.findOne({ where: { id: value } }).then((office) => {
                if (office === null) {
                    throw new Error('Office does not exists');
                }
            })),
        check('candidateId')
            .custom(value => notEmpty(value, 'Candidate ID field cannot be left blank'))
            .isNumeric()
            .withMessage('Office ID must be an Integer')
            .custom(value => Candidates.findOne({ where: { id: value } }).then((candidate) => {
                if (candidate === null) {
                    throw new Error('Candidate does not exists');
                }
            })),
    ],
};
