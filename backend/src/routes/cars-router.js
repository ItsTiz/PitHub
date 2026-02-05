import express from 'express';
import controller from '../controllers/cars-controller.js';

const carRouter = express.Router();

carRouter.route('/')
    .get(controller.listElements)
    .post(controller.createElements);

carRouter.route('/:id')
    .get(controller.getElement)
    .put(controller.updateElement)
    .delete(controller.deleteElement);

carRouter.route('/search/team/:team')
    .get(controller.findCarsByTeam);

carRouter.route('/search/engine/:engine_manufacturer')
    .get(controller.findCarsByEngineManufacturer);

export default carRouter;
