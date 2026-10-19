import mongoose from "mongoose";
import { normalizeMongoUri } from "./normalizeMongoUri.js";

const connectDB = async () => {
    try {
        const { uri, correctedLegacyOption } = normalizeMongoUri(process.env.MONGO_URI);
        if (correctedLegacyOption) {
            console.warn("Corrected the old ShowCase URI option. Update MONGO_URI in Render when you can.");
        }
        await mongoose.connect(uri);
        console.log("MongoDB Atlas connected!");
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        process.exit(1);
    }

}

export default connectDB;
