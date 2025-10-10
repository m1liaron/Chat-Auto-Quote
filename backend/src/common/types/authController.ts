import type { NextFunction, Request, Response } from "express";

type RequestHandler<T = any> = (
	req: Request<T>,
	res: Response,
	next?: NextFunction,
) => any;

interface AuthRequest<T = any> extends Request<any, any, any, T> {
	user: {
		userId: string;
		name: string;
	}
}

type AuthRequestHandler<T = any> = (
	req: AuthRequest<T>,
	res: Response,
	next?: NextFunction,
) => any;

export type { RequestHandler, AuthRequestHandler };
