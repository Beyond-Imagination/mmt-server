import mongoose from 'mongoose';

let dbURI = "mongodb+srv://admin:Beyond_Imagination@cluster0.gxulv.mongodb.net/dev?retryWrites=true&w=majority"

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
