import teamModel from '../models/team.js';
import BaseController from './base-controller.js';

class TeamController extends BaseController {

    constructor(schema) {
        super(schema);
    }

    findTeamsByYearJoined = async (req, res) => {
        const year_joined = req.params.year_joined;

        if (!year_joined) {
            this.badRequestError(res, 'Missing query parameter: year_joined');
        }

        await this._schemaModel
            .find()
            .where('year_joined').equals(year_joined)
            .then(doc => {
                if (!doc) {
                    this._notFoundError(res, 'No Team joined in: ' + year_joined + '.');
                }
                res.json(doc);
            })
            .catch(err => {
                this._genericServerError(res, err);
            });
    };

    findTeamsByNationality = async (req, res) => {
        const nationality = req.params.nationality;

        if (!nationality) {
            this.badRequestError(res, 'Missing query parameter: nationality');
        }

        await this._schemaModel
            .find()
            .where('nationality').equals(nationality)
            .then(doc => {
                if (!doc) {
                    this._notFoundError(res, 'No Team with nationality: ' + nationality + '.');
                }
                res.json(doc);
            })
            .catch(err => {
                this._genericServerError(res, err);
            });
    };
}
export default new TeamController(teamModel);