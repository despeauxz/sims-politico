import models from '../models';
import response from '../helpers/response';

const { Vote, Office } = models;

class VoteController {
    static async vote(req, res) {
        const { officeId, candidateId } = req.body;
        const voterId = req.user.id;

        await Office.findOne({
            where: { id: officeId }
        }).then((office) => {
            if (office.electionDate === null) {
                return response.errorResponse(res, 400, 'Election date not confirmed yet');
            } if (new Date() >= new Date(office.electionDate)) {
                return response.errorResponse(res, 400, 'Poll voting has not began yet');
            }
            office.createVote({
                officeId,
                candidateId,
                voterId
            }).then(vote => response.successResponse(res, 201, vote)).catch(() => response.errorResponse(res, 409, 'You cannot vote for same office multiple times'));
        }).catch(error => response.errorResponse(res, 500, error));

        // await Vote.create({
        //     officeId,
        //     candidateId,
        //     voterId
        // }).then(async vote => response.successResponse(res, 201, vote))
        //     .catch(() => response.errorResponse(res, 409, 'You cannot vote for same office multiple times'));
    }

    static async getUserHistory(req, res) {
        const voterId = req.user.id;

        await Vote.findAll({
            where: { voterId },
            include: [
                {
                    model: models.Office,
                    as: 'office'
                },
                // {
                //     model: models.Candidate,
                //     as: 'candidate'
                // },
                {
                    model: models.User,
                    as: 'user'
                }
            ]
        }).then(history => response.successResponse(res, 200, history));
    }
}

export default VoteController;
