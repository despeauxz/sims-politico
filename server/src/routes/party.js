import express from 'express';
import ValidationHandler from '../middlewares/ValidationHandler';
import PartyController from '../controllers/PartyController';
import partyValidation from '../validations/partyValidation';
import trim from '../middlewares/trim';
import Authorization from '../middlewares/Authorization';

const partyRoutes = express.Router();
const validation = [ValidationHandler.validate, trim, ValidationHandler.isEmptyReq];
partyRoutes.use(Authorization.authorize);

partyRoutes.post('/', Authorization.authorizeAdmin, partyValidation.createParty, validation, PartyController.create);
partyRoutes.get('/', PartyController.getAll);
partyRoutes.get('/:id', PartyController.getOne);
partyRoutes.patch('/:id', Authorization.authorizeAdmin, partyValidation.update, validation, PartyController.update);
partyRoutes.delete('/:id', Authorization.authorizeAdmin, PartyController.delete);

export default partyRoutes;
