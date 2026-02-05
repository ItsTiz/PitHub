import teamModel from '../models/team.js';
import Car from '../models/car.js';
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

     listTeamsWithDrivers = async (_, res) => {
        try {
            const cars = await Car.find()
                .select('team driver')
                .populate('team')
                .populate({
                    path: 'driver',
                    select: 'full_name number -_id'
                })
                .lean();

            const teamsMap = {};

            cars.forEach(car => {
                if (!car.team || !car.driver) return;

                const teamId = car.team._id.toString();

                if (!teamsMap[teamId]) {
                    teamsMap[teamId] = {
                        ...car.team,
                        drivers: []
                    };
                }

            
                const alreadyPresent = teamsMap[teamId].drivers
                    .some(d => d.number === car.driver.number);

                if (!alreadyPresent) {
                    teamsMap[teamId].drivers.push(car.driver);
                }
            });

            const result = Object.values(teamsMap);
            console.log(result);
            res.json(result);

        } catch (err) {
            this._genericServerError(res, err);
        }}

}
export default new TeamController(teamModel);