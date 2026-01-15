import express from 'express';
import controller from '../controllers/drivers-controller.js';

const driverRouter = express.Router();

driverRouter.route('/')
    .get(controller.listElements)
    .post(controller.createElements);

driverRouter.route('/:id')
    .get(controller.getElement)
    .put(controller.updateElement)
    .delete(controller.deleteElement);

driverRouter.route('/search/:nationality')
    .get(controller.findDriverByNationality);

export default driverRouter;
