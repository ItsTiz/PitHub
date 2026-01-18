import mongoose from 'mongoose';

export const connectDb = async () => {
    try {
        await mongoose.connect(process.env.DB_URI.toString());
        successConnectionHandler();
    } catch(err) {        
        failureConnectionHandler(err);
    }
}

const successConnectionHandler = () => {
    console.log('Connected to MongoDB successfully.');
}

const failureConnectionHandler = (err) => {
    console.log('Database connection error:', err)
}