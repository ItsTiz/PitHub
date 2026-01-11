import Errors from "./errors.js"

class BaseController {
    _schemaModel;

    constructor(schemaModel) {
        this._schemaModel = schemaModel;
    }

    _badRequestError(res, err) {
        return res.status(Errors.BAD_REQUEST).send(err);
    }

    _notFoundError(res, err = 'Element not found.') {
        return res.status(Errors.NOT_FOUND).send(err);
    }

    _genericServerError(res, err) {
        res.status(Errors.GENERIC_SERVER).send(err);
    }

    getElement = (req, res) => {
        this._schemaModel
            .findById(req.params.id)
            .then(doc => {
                if (!doc) {
                    this._notFoundError(res);
                }
                res.json(doc);
            })
            .catch(err => {
                this._genericServerError(res, err);
            });
    }

    updateElement = (req, res) => {
        this._schemaModel
            .findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then(doc => {
                if (!doc) {
                    this._notFoundError(res);
                }
                res.json(doc);
            })
            .catch(err => {
                this._genericServerError(res, err);
            });
    }

    createElements = (req, res) => {
        this._schemaModel
            .insertMany(req.body)
            .then(doc => {
                res.json(doc);
            })
            .catch(err => {
                this._badRequestError(res, err)
            });
    }

    deleteElement = (req, res) => {
        this._schemaModel
            .findByIdAndDelete(req.params.id)
            .then(doc => {
                if (!doc) {
                    this._notFoundError(res);
                }
                res.json({ message: 'Element deleted.' });
            })
            .catch(err => {
                this._badRequestError(res, err)
            });
    }

    listElements = (_, res) => {
        this._schemaModel
            .find()
            .then(doc => {
                res.json(doc);
            })
            .catch(err => {
                this._genericServerError(res, err);
            });
    }
}

export default BaseController;