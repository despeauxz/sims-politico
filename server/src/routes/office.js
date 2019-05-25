import express from 'express';
import ValidationHandler from '../middlewares/ValidationHandler';
import OfficeController from '../controllers/OfficeController';
import officeValidation from '../validations/officeValidation';
import trim from '../middlewares/trim';
import Authorization from '../middlewares/Authorization';


const officeRoutes = express.Router();
const validation = [ValidationHandler.validate, trim, ValidationHandler.isEmptyReq];
officeRoutes.use(Authorization.authorize);

officeRoutes.post('/', officeValidation.createOffice, validation, OfficeController.create);
officeRoutes.get('/', OfficeController.getAll);
officeRoutes.get('/:id', OfficeController.getOne);
officeRoutes.patch('/:id', officeValidation.update, validation, OfficeController.update);
officeRoutes.delete('/:id', OfficeController.delete);

export default officeRoutes;
