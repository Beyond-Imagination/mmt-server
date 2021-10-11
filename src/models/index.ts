import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';
autoIncrement.initialize(mongoose.connection);

let dbURI = process.env.DB_URI;

const connect = async () => {
    try {
        await mongoose.connect(dbURI);
        console.log('MongoDB connected!!');
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
        throw err;
    }
};

export default {
    connect: connect,
}
