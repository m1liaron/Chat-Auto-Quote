import { EnvVariables } from "./common/enums/index.js";
import { connectMongoDb } from "./db/connectMongoDB.js";
import { app } from "./app.js";
import { validateEnvVariables } from "./helpers/validateEnvVariables.js";

const port = EnvVariables.PORT || 3000;

const start = async () => {
	try {
		validateEnvVariables();
		await connectMongoDb();
		app.listen(port, () => {
			console.log(`Server running on port http://localhost:${port}`);
		});
	} catch (error) {
		console.error("Error starting server: ", error);
	}
};

start();