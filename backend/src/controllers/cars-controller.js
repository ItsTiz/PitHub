import carModel from '../models/car.js';
import BaseController from './base-controller.js';

class CarController extends BaseController {

    constructor(schema) {
        super(schema);
        this.findCarsByEngineManufacturer = this._searchByParameter("engine_manufacturer");
        this.findCarsByTeam = this._searchByParameter("team", "driver");
    }

    getElementsAsJsArray = async () => {
        return await this._schemaModel
            .find()
            .populate('team')
            .populate('driver')
            .lean();
    }
}
export default new CarController(carModel);