import express from 'express';
import * as controller from '../controllers/carController.js';

const carRouter = express.Router();

carRouter.route('/')
    .get(controller.listCars)
    .post(controller.createCar);

carRouter.route(':id')
    .get(controller.getCar)
    .put(controller.updateCar)
    .delete(controller.deleteCar);

carRouter.route('/:mfr')
    .get(controller.findCarsByMfr);

export default carRouter;
