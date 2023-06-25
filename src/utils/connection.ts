import mongoose from 'mongoose';
import dotenv from "dotenv"

dotenv.config()

export const connectDB = async (): Promise<void> => {

    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/zonaRunning" );

        console.log('Connected to MongoDb');

    } catch (error) {
        console.log('MongoDB connection error:', error )
    }   
}
