import controller from '../controllers/cars-controller.js';


const getCars = async () => {
    return await controller.getElementsAsJsArray();
}

export { getCars };