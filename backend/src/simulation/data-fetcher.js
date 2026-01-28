import controller from '../controllers/cars-controller.js';


const getCars = async () => {
    const cars = await controller.getElementsAsJsArray();
    console.log(cars);
    return cars;
}

export { getCars };