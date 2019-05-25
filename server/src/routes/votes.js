import express from 'express';
import ValidationHandler from '../middlewares/ValidationHandler';
import VoteController from '../controllers/VoteController';
import voteValidation from '../validations/votesValidation';
import trim from '../middlewares/trim';
import Authorization from '../middlewares/Authorization';


const voteRoutes = express.Router();
const validation = [ValidationHandler.validate, trim, ValidationHandler.isEmptyReq];
voteRoutes.use(Authorization.authorize);

voteRoutes.post('/', voteValidation.votes, validation, VoteController.vote);
voteRoutes.get('/', VoteController.getUserHistory);

export default voteRoutes;
