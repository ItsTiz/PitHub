import express from 'express';
import { authMiddleware } from '../middleware/auth.js';
import controller from '../controllers/user-controller.js';

const usersRouter = express.Router();

usersRouter.route('/register')
    .post(controller.register);

usersRouter.route('/login')
    .post(controller.login);

usersRouter.route('/')
    .get(controller.listUsersWithTeams)
    .post(controller.createElements);

usersRouter.route('/:id')
    .get(controller.getElement)
    .put(controller.updateElement)
    .delete(controller.deleteElement);

usersRouter.route('/change-password')
    .post(authMiddleware, controller.changePassword);    


usersRouter.route('/admin-reset-password')
    .post(authMiddleware, controller.adminResetPassword);

usersRouter.route('/:id')
    .delete(authMiddleware, controller.deleteElement);   

export default usersRouter;

