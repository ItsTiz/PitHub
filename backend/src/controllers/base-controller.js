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

    _searchByParameter(paramName, populateBy = null) {
        return async (req, res) => {
            const _parameterName = paramName;
            const _parameterValue = req.params[paramName];

            if (!_parameterValue) {
                return this._badRequestError(res, `Missing query parameter: ${_parameterName}`);
            }

            try {
                let query = this._schemaModel.where(_parameterName).equals(_parameterValue)

                if (populateBy) {
                    query = query.populate(populateBy);
                }

                const doc = await query;

                if (!doc) {
                    const errorString = `No element with ${_parameterValue} as ${_parameterName} found.`;
                    return this._notFoundError(res, errorString);
                }

                res.json(doc);

            } catch (err) {
                this._genericServerError(res, err);
            }
        };
    }

     _findOneByParameter(paramName, populateBy = null) {
        return async (req, res) => {
            const _parameterName = paramName;
            const _parameterValue = req.params[paramName];

            if (!_parameterValue) {
                return this._badRequestError(res, `Missing query parameter: ${_parameterName}`);
            }

            try {
                let query = this._schemaModel.findOne({ [_parameterName]: _parameterValue });

                if (populateBy) {
                    query = query.populate(populateBy);
                }
                const doc = await query;

                if (!doc) {
                    const errorString = `No element with ${_parameterValue} as ${_parameterName} found.`;
                    return this._notFoundError(res, errorString);
                }

                res.json(doc);

            } catch (err) {
                this._genericServerError(res, err);
            }
        };
    }

    getElement = async (req, res) => {
        await this._schemaModel
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

    updateElement = async (req, res) => {
        await this._schemaModel
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

    createElements = async (req, res) => {
        await this._schemaModel
            .insertMany(req.body)
            .then(doc => {
                res.json(doc);
            })
            .catch(err => {
                this._badRequestError(res, err)
            });
    }

    deleteElement = async (req, res) => {
        await this._schemaModel
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

    listElements = async (_, res) => {
        await this._schemaModel
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