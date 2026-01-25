import controller from '../controllers/cars-controller.js';


const getCars = () => {
    return controller.getElementsAsJsArray();
}

export { getCars };