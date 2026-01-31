import express from 'express';
import { authMiddleware } from '../middleware/auth.js';
import controller from '../controllers/user-controller.js';

const usersRouter = express.Router();

usersRouter.route('/register')
    .post(controller.register);

usersRouter.route('/login')
    .post(controller.login);

usersRouter.route('/')
    .get(controller.listElements)
    .post(controller.createElements);

usersRouter.route('/:id')
    .get(controller.getElement)
    .put(controller.updateElement)
    .delete(controller.deleteElement);

usersRouter.route('/change-password')
    .post(authMiddleware, controller.changePassword);    

export default usersRouter;

