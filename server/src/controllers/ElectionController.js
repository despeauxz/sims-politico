/* eslint-disable no-restricted-globals */
/* eslint-disable consistent-return */
import sequelize from 'sequelize';
import models from '../models';
import response from '../helpers/response';

class ElectionController {
    static async registerCandidates(req, res) {
        const userId = req.params.id;
        if (isNaN(userId)) return response.errorResponse(res, 400, 'Params must be an integer');

        const { officeId, partyId } = req.body;

        await models.User.findOne({
            where: { id: userId }
        }).then((user) => {
            if (!user) return response.errorResponse(res, 404, 'User does not exists');
        });

        await models.Candidate.create({
            userId,
            officeId,
            partyId
        }).then(candidate => response.successResponse(res, 201, candidate))
            .catch(() => response.errorResponse(res, 409, 'You cannot register for same office multiple times'));
    }

    static async candidateCollection(req, res) {
        await models.Candidate.findAll({
            include: [
                {
                    model: models.User,
                    attributes: ['firstname', 'lastname'],
                    as: 'user'
                },
                {
                    model: models.Party,
                    attributes: ['name'],
                    as: 'party'
                },
                {
                    model: models.Office,
                    attributes: ['name'],
                    as: 'office'
                },
            ],
        }).then(details => response.successResponse(res, 200, details));
    }

    static async collectConfirmedCandidates(req, res) {
        await models.Candidate.findAll({
            where: {
                confirm: true,
            },
            include: [
                {
                    model: models.User,
                    attributes: ['firstname', 'lastname'],
                    as: 'user'
                },
                {
                    model: models.Party,
                    attributes: ['name'],
                    as: 'party'
                },
                {
                    model: models.Office,
                    attributes: ['name'],
                    as: 'office'
                },
            ],
        }).then(details => response.successResponse(res, 200, details));
    }

    static async confirmCandidate(req, res) {
        const userId = req.params.id;
        await models.Candidate.findOne({ where: { id: userId } }).then((candidate) => {
            if (!candidate) return response.errorResponse(res, 404, 'Candidate does not exists');

            candidate.update({
                confirm: true,
            });

            return response.successResponse(res, 200, candidate);
        });
    }

    static async getResults(req, res) {
        const { officeId } = req.params;

        try {
            const candidates = await models.Candidate.findAll({
                where: { officeId },
                include: {
                    model: models.Vote,
                    attributes: [[sequelize.fn('COUNT', sequelize.col('Candidate.id')), 'total']],
                    as: 'votes'
                },
                group: ['Candidate.id', 'Candidate.confirm', 'Candidate.partyId', 'Candidate.officeId', 'Candidate.userId', 'Candidate.createdAt', 'Candidate.updatedAt', 'votes.id']
            });

            return res.json({ candidates });
        } catch (error) {
            console.log(error);
        }
    }
}

export default ElectionController;
