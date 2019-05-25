/* eslint-disable no-restricted-globals */
import response from './response';

const validateParams = (res, value) => {
    if (isNaN(value)) return response.errorResponse(res, 400, 'Params must be an Integer');
};

export default validateParams;
