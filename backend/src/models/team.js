import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
    name: { type: String, required: true },
    name_slug: { type: String},
    full_name: { type: String, required: true },
    joined_year: { type: Number, required: true },
    nationality: { type: String, required: true},
    headquarters: { type: String },
    team_principal : { type: String }
});

teamSchema.pre('save', function(next) {
    if (this.isModified('Name')) {
        this.name_slug = this.Name.toLowerCase().replace(/\s+/g, '');
    }
});

const teamModel = mongoose.model('Team', teamSchema);

export default teamModel;