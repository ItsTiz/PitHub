import teamModel from '../models/team.js';
import BaseController from './base-controller.js';

class TeamController extends BaseController {

    constructor(schema) {
        super(schema);

        this.findTeamByYearJoined = this._searchByParameter("joined_year")
        this.findTeamByNationality = this._searchByParameter("nationality")
        this.findTeamByName = this._findOneByParameter("name_slug")
    }

    getElementsAsJsArray = async () => {
        return await this._schemaModel
            .find()
            .lean();
    }
}
export default new TeamController(teamModel);