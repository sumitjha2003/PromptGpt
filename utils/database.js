import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery',true);
    if(isConnected) {
        console.log("MongoDB is already connected");
        return;
    }

    try {
        process.env.MONGO_URI
        await mongoose.connect(process.env.MONGO_URI)
        isConnected = true;
        console.log('MongoDB connected')
    } catch (error) {
        console.log(error);
    }
}