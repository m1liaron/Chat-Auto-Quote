import type { Application } from "express";
import { authMiddleware } from "../middlewares/index.js";
import { chatRoute, authRoute, userRoute, messageRoute } from "../routes/routes.js";

const registerRoutes = (app: Application) => {
	app.use("/auth", authRoute);
	app.use("/chats", authMiddleware, chatRoute);
	app.use("/users", authMiddleware, userRoute)
	app.use("/messages", authMiddleware, messageRoute);
};

export { registerRoutes };
