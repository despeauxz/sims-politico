import express from 'express';
import ValidationHandler from '../middlewares/ValidationHandler';
import ElectionController from '../controllers/ElectionController';
import votesValidation from '../validations/votesValidation';
import Authorization from '../middlewares/Authorization';
import trim from '../middlewares/trim';

const electionRoutes = express.Router();
const validation = [ValidationHandler.validate, trim, ValidationHandler.isEmptyReq];

electionRoutes.use(Authorization.authorize);

electionRoutes.post('/:id/register', Authorization.authorizeAdmin, votesValidation.candidates, validation, ElectionController.registerCandidates);
electionRoutes.get('/:officeId/results', ElectionController.getResults);
electionRoutes.get('/:id/candidates', ElectionController.collectConfirmedCandidates);
electionRoutes.patch('/candidate/:id', Authorization.authorizeAdmin, ElectionController.confirmCandidate);
electionRoutes.get('/candidates', Authorization.authorizeAdmin, ElectionController.candidateCollection);


export default electionRoutes;
