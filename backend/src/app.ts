import cors from "cors";
import express, { type Application } from "express";
import { registerRoutes } from "./helpers/helpers.js";

const app: Application = express();

app.use(express.json());
app.use(cors());

registerRoutes(app);

export { app };
