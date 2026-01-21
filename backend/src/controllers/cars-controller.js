import carModel from '../models/car.js';
import BaseController from './base-controller.js';

class CarController extends BaseController {

    constructor(schema) {
        super(schema);
        this.findCarsByEngineManufacturer = this._searchByParameter("engine_manufacturer");
    }
}
export default new CarController(carModel);