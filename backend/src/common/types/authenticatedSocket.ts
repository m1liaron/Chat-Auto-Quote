import type { Socket } from "socket.io";

export interface AuthenticatedSocket extends Socket {
	user?: {
		userId: string;
		firstName: string;
		lastName: string;
	};
}
