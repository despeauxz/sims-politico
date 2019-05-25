/* eslint-disable consistent-return */
/* eslint-disable no-restricted-globals */
import { Op } from 'sequelize';
import models from '../models';
import response from '../helpers/response';

class PartyController {
    static async create(req, res) {
        const {
            name,
            hqAddress,
            fullname,
            logoUrl
        } = req.body;

        await models.Party.findOrCreate({
            where: { name: { [Op.iLike]: name } },
            defaults: {
                name,
                hqAddress,
                fullname,
                logoUrl,
            }
        }).spread((newParty, created) => {
            if (!created) response.errorResponse(res, 400, 'Party name already exists');

            response.successResponse(res, 201, newParty);
        });
    }

    static async getAll(req, res) {
        await models.Party.findAll().then((parties) => {
            response.successResponse(res, 200, parties);
        });
    }

    // eslint-disable-next-line consistent-return
    static async getOne(req, res) {
        // eslint-disable-next-line no-restricted-globals
        if (isNaN(req.params.id)) return response.errorResponse(res, 400, 'Params must be an Integer');

        await models.Party.findOne({
            where: { id: req.params.id }
        }).then((party) => {
            if (!party) response.errorResponse(res, 404, 'Party does not exists');

            response.successResponse(res, 200, party);
        });
    }

    static async update(req, res) {
        // eslint-disable-next-line no-restricted-globals
        if (isNaN(req.params.id)) return response.errorResponse(res, 400, 'Params must be an Integer');

        const {
            name,
            fullname
        } = req.body;

        await models.Party.findOne({
            where: { id: req.params.id }
        }).then((party) => {
            if (!party) return response.errorResponse(res, 404, 'Party does not exists');

            party.update({
                name: name || party.name,
                fullname: fullname || party.fullname
            }).then(updatedParty => response.successResponse(res, 200, updatedParty));
        });
    }

    static async delete(req, res) {
        if (isNaN(req.params.id)) return response.errorResponse(res, 400, 'Params must be an Integer');

        await models.Party.destroy({
            where: { id: req.params.id }
        }).then((party) => {
            if (!party) return response.errorResponse(res, 404, 'Party does not exists');

            response.messageResponse(res, 200, 'Party successfully deleted');
        });
    }
}

export default PartyController;
