import jwt, { type JwtPayload } from "jsonwebtoken";
import type { ExtendedError, Socket } from "socket.io";
import { EnvVariables } from "../common/enums/env-variables.js";
import { User } from "../models/User.model.js";

interface DecodedUserPayload extends JwtPayload {
	userId: string;
	name: string;
}

export interface AuthenticatedSocket extends Socket {
	user?: {
		userId: string;
		firstName: string;
		lastName: string;
	};
}

export const socketAuthMiddleware = async (
	socket: AuthenticatedSocket,
	next: (err?: ExtendedError) => void,
) => {
	try {
		const token = socket.handshake.auth?.token;

		if (!token) {
			return next(new Error("Authentication token missing"));
		}

		const payload = jwt.verify(
			token,
			EnvVariables.JWT_SECRET,
		) as DecodedUserPayload;
		const user = await User.findById(payload.userId);

		if (!user) {
			return next(new Error("User not found"));
		}

		socket.user = {
			userId: String(user._id),
			firstName: user.firstName,
			lastName: user.lastName,
		};

		next();
	} catch (error) {
		console.error("Socket auth failed:", error);
		next(new Error("Authentication failed"));
	}
};
