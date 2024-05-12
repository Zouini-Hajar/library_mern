import { configDotenv } from "dotenv";
import mongoose from "mongoose";

configDotenv();

const MONGODB_URI = process.env.MONGODB_URI;

const connectToMongoDB = () => {
  mongoose
    .connect(MONGODB_URI)
    .then(() => console.log("Connected to DB successfully"))
    .catch((err) => console.log(`Unable to connect to DB \n${err}`));
};

export default connectToMongoDB;
