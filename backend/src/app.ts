import cors from "cors";
import express, { type Application } from "express";
import http from "http";
import { Server } from "socket.io";
import { registerRoutes } from "./helpers/helpers.js";
import { socketAuthMiddleware } from "./middlewares/socketAuthMiddleware.js";
import { connectionSocket } from "./sockets/connection.js";

const app: Application = express();
const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: "*",
		methods: ["GET", "POST"],
	},
});

app.use(express.json());
app.use(cors());

io.use(socketAuthMiddleware);

io.on("connection", connectionSocket);

registerRoutes(app);

export { app, server };
