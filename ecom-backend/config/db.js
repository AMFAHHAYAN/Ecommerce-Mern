import mongoose from "mongoose";
import { config } from "../config/config.js";
const configuration = config[process.env.NODE_ENV]
const MONGO_URL = configuration.MONGO_URL

// const MONGO_URL = `mongodb://localhost:${configuration.DB.DB_HOST}/${configuration.DB.DB_NAME}`;

const ConnectToDb = async () => {
    try {
        const db  = await mongoose.connect(MONGO_URL)
        console.log("DB connected")
    } catch (error) {
        console.log("Error while connecting DB ",error.message)  
    }
}

module.exports = ConnectToDb