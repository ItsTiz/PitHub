import carModel from '../models/car.js';
import BaseController from './base-controller.js';

class CarController extends BaseController {

    constructor(schema) {
        super(schema);
    }

    findCarsByMfr = async (req, res) => {
        const mfr = req.params.mfr;

        if (!mfr) {
            this.badRequestError(res, 'Missing query parameter: msf');
        }

        await this._schemaModel
            .find()
            .where('engine_manufacturer').equals(mfr)
            .then(doc => {
                if (!doc) {
                    this._notFoundError(res, 'No car with ' + mfr + ' as manufacturer found.');
                }
                res.json(doc);
            })
            .catch(err => {
                this._genericServerError(res, err);
            });
    };
}
export default new CarController(carModel);