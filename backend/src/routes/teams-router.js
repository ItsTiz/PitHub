import express from 'express';
import controller from '../controllers/teams-controller.js';

const teamsRouter = express.Router();

teamsRouter.route('/')
    .get(controller.listElements)
    .post(controller.createElements);

teamsRouter.route('/:id')
    .get(controller.getElement)
    .put(controller.updateElement)
    .delete(controller.deleteElement);

teamsRouter.route('/search/:year_joined')
    .get(controller.findTeamsByYearJoined);

teamsRouter.route('/search/:nationality')
    .get(controller.findTeamsByNationality);

export default teamsRouter;
