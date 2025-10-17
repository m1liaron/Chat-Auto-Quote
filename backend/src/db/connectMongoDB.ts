import mongoose from "mongoose";
import { EnvVariables } from "../common/enums/index.js";

const connectMongoDb = async () => {
	try {
		mongoose.connect(EnvVariables.MONGO_URI);
		console.log("Connected to MongoDB🟩🟩🟩🟩");
	} catch (error) {
		console.error("Connection to Database went error: ", error);
		process.exit(1);
	}
};

export { connectMongoDb };
