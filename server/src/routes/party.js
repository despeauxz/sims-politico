import express from 'express';
import ValidationHandler from '../middlewares/ValidationHandler';
import PartyController from '../controllers/PartyController';
import partyValidation from '../validations/partyValidation';
import trim from '../middlewares/trim';
import Authorization from '../middlewares/Authorization';

const partyRoutes = express.Router();
const validation = [ValidationHandler.validate, trim, ValidationHandler.isEmptyReq];
partyRoutes.use(Authorization.authorize);

partyRoutes.post('/', partyValidation.createParty, validation, PartyController.create);
partyRoutes.get('/', PartyController.getAll);
partyRoutes.get('/:id', PartyController.getOne);
partyRoutes.patch('/:id', partyValidation.update, validation, PartyController.update);
partyRoutes.delete('/:id', PartyController.delete);

export default partyRoutes;
