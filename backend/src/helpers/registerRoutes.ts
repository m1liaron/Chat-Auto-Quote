import type { Application } from "express";
import { authRoute } from "../routes/auth-route.js";

const registerRoutes = (app: Application) => {
	app.use("/auth", authRoute);
};

export { registerRoutes };
