import mongoose from 'mongoose';

const connectToDatabase = async ()=> {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("hello mongoose");
    } catch (error) {
        console.error("Database connection failed:", error.message);
        process.exit(1); 
    }
}

export default connectToDatabase;