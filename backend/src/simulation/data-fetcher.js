import carController from '../controllers/cars-controller.js';
import teamController  from '../controllers/teams-controller.js';

const normalize = (str) => str?.toString().replaceAll(' ', '').toLowerCase();

const getCars = async () => {

    return await carController.getElementsAsJsArray();
}

const getTeamDocument = async (searchName) => {
    const allTeams = await teamController.getElementsAsJsArray();
    const foundTeam = allTeams.find(t => normalize(t.name) === normalize(searchName));
    if (!foundTeam) return null;

    return foundTeam;
}

export { getCars, getTeamDocument };