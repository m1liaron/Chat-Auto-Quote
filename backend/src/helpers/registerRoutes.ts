import type { Application } from "express";
import { authRoute } from "../routes/authRoute.js";

const registerRoutes = (app: Application) => {
	app.use("/auth", authRoute);
};

export { registerRoutes };
