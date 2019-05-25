/* eslint-disable consistent-return */
/* eslint-disable no-restricted-globals */
import { Op } from 'sequelize';
import models from '../models';
import response from '../helpers/response';

class OfficeController {
    static async create(req, res) {
        const {
            name,
            type,
            electionDate
        } = req.body;

        await models.Office.findOrCreate({
            where: { name: { [Op.iLike]: name } },
            defaults: {
                name,
                type,
                electionDate,
            }
        }).spread((newOffice, created) => {
            if (!created) return response.errorResponse(res, 400, 'Office name already exists');

            response.successResponse(res, 201, newOffice);
        });
    }

    static async getAll(req, res) {
        await models.Office.findAll().then((offices) => {
            response.successResponse(res, 200, offices);
        });
    }

    static async getOne(req, res) {
        if (isNaN(req.params.id)) return response.errorResponse(res, 400, 'Params must be an Integer');

        await models.Office.findOne({
            where: { id: req.params.id }
        }).then((office) => {
            if (!office) response.errorResponse(res, 404, 'Office does not exists');

            response.successResponse(res, 200, office);
        });
    }

    static async update(req, res) {
        if (isNaN(req.params.id)) return response.errorResponse(res, 400, 'Params must be an Integer');

        const { name, type, electionDate } = req.body;

        await models.Office.findOne({
            where: { id: req.params.id }
        }).then((office) => {
            if (!office) return response.errorResponse(res, 404, 'Office does not exists');

            office.update({
                name: name || office.name,
                type: type || office.type,
                electionDate: electionDate || office.electionDate
            })
                .then(updatedOffice => response.successResponse(res, 200, updatedOffice));
        });
    }

    static async delete(req, res) {
        if (isNaN(req.params.id)) return response.errorResponse(res, 400, 'Params must be an Integer');

        await models.Office.destroy({
            where: { id: req.params.id }
        }).then((office) => {
            if (!office) return response.errorResponse(res, 404, 'Office does not exists');

            response.messageResponse(res, 200, 'Office successfully deleted');
        });
    }
}

export default OfficeController;
