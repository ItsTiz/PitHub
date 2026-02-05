import express from 'express';
import controller from '../controllers/teams-controller.js';

const teamsRouter = express.Router();

teamsRouter.route('/')
    .get(controller.listTeamsWithDrivers)
    .post(controller.createElements);

teamsRouter.route('/:id')
    .get(controller.getElement)
    .put(controller.updateElement)
    .delete(controller.deleteElement);

teamsRouter.route('/search/year/:joined_year')
    .get(controller.findTeamByYearJoined);

teamsRouter.route('/search/name/:name_slug')
    .get(controller.findTeamByName);

teamsRouter.route('/search/nationality/:nationality')
    .get(controller.findTeamByNationality);

export default teamsRouter;
