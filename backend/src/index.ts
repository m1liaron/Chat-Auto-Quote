import cors from "cors";
import express, { type Application } from "express";

const app: Application = express();

app.use(express.json());
app.use(cors());

const port = 3000;

const start = async () => {
	try {
		app.listen(port, () => {
			console.log(`Server running on port https://localhost:${port}`);
		});
	} catch (error) {
		console.error("Error starting server: ", error);
	}
};

start();

export { app };
