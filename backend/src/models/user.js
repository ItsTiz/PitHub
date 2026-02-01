import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        email: {type: String, required: true, unique: true, lowercase: true, trim: true},
        password: {type: String, required: true, minlength: 6, select: false},
        role: {type: String, enum: ['user', 'admin', 'team'], default: 'user'},
        team: { type: String, default: null }
    },
);

userSchema.pre('save', function (next) {
    this.email = this.email.toLowerCase();
});

const userModel = mongoose.model('User', userSchema);
export default userModel;