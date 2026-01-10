import carModel from '../models/car.js';

const listCars = (_, res) => {
    carModel.find()
        .then(doc => {
            res.json(doc);
        })
        .catch(err => {
            res.send(err);
        });
}

const createCar = (req, res) => {
    const car = new carModel(req.body);
    car.save()
        .then(doc => {
            res.json(doc);
        })
        .catch(err => {
            res.status(400).send(err);
        });
}

const getCar = (req, res) => {
    carModel.findById(req.params.id)
        .then(doc => {
            if (!doc) {
                return res.status(404).send('Car not found.');
            }
            res.json(doc);
        })
        .catch(err => {
            res.status(500).send(err);
        });
}

const updateCar = (req, res) => {
    carModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(doc => {
            if (!doc) {
                return res.status(404).send('Car not found');
            }
            res.json(doc);
        })
        .catch(err => {
            res.status(500).send(err);
        });
}

const deleteCar = (req, res) => {
    carModel.findByIdAndDelete(req.params.id)
        .then(doc => {
            if (!doc) {
                return res.status(404).send('Car not found');
            }
            res.json({ message: 'Car deleted.' });
        })
        .catch(err => {
            res.status(500).send(err);
        });
}

const findCarsByMfr = (req, res) => {
    const mfr = req.params.mfr;

    if (!mfr) {
        return res.status(400).send('Missing query parameter: msf');
    }

    carModel.find()
        .where('engine_manufacturer').equals(mfr)
        .then(docs => {
            if (!doc) {
                return res.status(404).send('No car with ' + mfr + ' as manufacturer found.');
            }
            res.json(docs);
        })
        .catch(err => {
            res.status(500).send(err);
        });
}

export { listCars, createCar, getCar, updateCar, deleteCar, findCarsByMfr };