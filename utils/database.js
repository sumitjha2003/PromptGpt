import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery',true);
    if(isConnected) {
        console.log("MongoDB is already connected");
        return;
    }

    try {
        const password = encodeURIComponent(process.env.MONGO_PASSWORD.trim());
        const MONGO = `mongodb+srv://sumo123:${password}@cluster1.mdc7e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1`
        await mongoose.connect(MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        isConnected = true;
        console.log('MongoDB connected')
    } catch (error) {
        console.log(error);
    }
}