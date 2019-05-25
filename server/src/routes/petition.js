import express from 'express';
import ValidationHandler from '../middlewares/ValidationHandler';
import PetitionController from '../controllers/PetitionController';
import petitionValidation from '../validations/petitionValidation';
import trim from '../middlewares/trim';
import Authorization from '../middlewares/Authorization';

const petitionRoutes = express.Router();
const validation = [ValidationHandler.validate, trim, ValidationHandler.isEmptyReq];
petitionRoutes.use(Authorization.authorize);

petitionRoutes.post('/', petitionValidation.create, validation, PetitionController.create);
petitionRoutes.get('/', PetitionController.getAll);

export default petitionRoutes;
