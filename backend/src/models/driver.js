import mongoose from 'mongoose';

const driverSchema = new mongoose.Schema({
    full_name: {
        type: String,
        required: true
    },
    dob: {
        type: Number,
        required: true,
        min: 1901,
        max: 2026
    },
    nationality: {
        type: String,
        required: true
    }, 
    height: {
        type: Number
    },
    weight: {
        type: Number
    },
    number: {
        type: Number,
        required: true
    },
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    }
});

const driverModel = mongoose.model('Driver', driverSchema);

export default driverModel;