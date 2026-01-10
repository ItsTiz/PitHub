import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
    model: { type: String, required: true },
    engine_manufacturer: { type: String, required: true },
    base_weight_kg: {
        type: Number,
        default: 798
    },
    fuel_capacity_kg: {
        type: Number,
        default: 110
    },
    specs: {
        max_speed_kmh: { type: Number, default: 340 },
        acceleration_0_100_s: { type: Number, default: 2.5 },
        downforce_rating: { type: Number, min: 0, max: 100 },
        reliability_rating: { type: Number, min: 0, max: 100 }
    },
    team: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Team' }
});

const carModel = mongoose.model('Car', carSchema);

export default carModel;