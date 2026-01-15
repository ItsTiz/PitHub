import driverModel from '../models/driver.js';
import BaseController from './base-controller.js';

class DriverController extends BaseController {

    constructor(schema) {
        super(schema);

        this.findDriverByNationality = this._searchByParameter("nationality");
    }
}
export default new DriverController(driverModel);