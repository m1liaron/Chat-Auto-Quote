import cors from "cors";
import express, { type Application } from "express";
import { EnvVariables } from "./common/enums/index.js";
import { connectMongoDb } from "./db/connectMongoDB.js";

const app: Application = express();

app.use(express.json());
app.use(cors());

const port = EnvVariables.PORT || 3000;

const start = async () => {
	try {
		await connectMongoDb();
		app.listen(port, () => {
			console.log(`Server running on port https://localhost:${port}`);
		});
	} catch (error) {
		console.error("Error starting server: ", error);
	}
};

start();

export { app };
