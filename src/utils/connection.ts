import mongoose from 'mongoose';
import dotenv from "dotenv"

dotenv.config()

export const connectDB = async (): Promise<void> => {

    try {
        await mongoose.connect("mongodb://localhost:27017/zonarunning");

        console.log('Connected to MongoDb');

    } catch (error) {
        console.log('MongoDB connection error:', error)
    }   
}
