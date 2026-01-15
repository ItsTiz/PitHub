import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
    name: { type: String, required: true },
    full_name: { type: String, required: true },
    joined_year: { type: Number, required: true },
    nationality: { type: String, required: true},
    headquarters: { type: String },
    team_principal : { type: String }
});

const teamModel = mongoose.model('Team', teamSchema);

export default teamModel;