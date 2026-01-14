import mongoose from 'mongoose';

const connectionString = 'mongodb://root:pithub@localhost:27017/pithub?authSource=admin';;

export const connectDb = async () => {
    try {
        await mongoose.connect(connectionString);
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