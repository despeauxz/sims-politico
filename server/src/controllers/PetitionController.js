/* eslint-disable consistent-return */
import models from '../models';
import response from '../helpers/response';

class PetitionController {
    static async create(req, res) {
        const {
            title,
            text,
            officeId
        } = req.body;

        await models.Office.findOne({
            where: { id: officeId }
        }).then((office) => {
            if (!office) return response.errorResponse(res, 404, 'Office Id does not exists');
        });

        await models.Petition.create({
            title,
            text,
            officeId,
            createdBy: req.user.id,
        }).then((petition) => {
            response.successResponse(res, 201, petition);
        });
    }

    static async getAll(req, res) {
        await models.Petition.findAll({
            include: [
                {
                    model: models.User,
                    attributes: ['firstname', 'lastname'],
                    as: 'user'
                },
                {
                    model: models.Office,
                    attributes: ['name'],
                    as: 'office',
                }
            ]
        }).then((petitions) => {
            response.successResponse(res, 200, petitions);
        });
    }
}

export default PetitionController;
