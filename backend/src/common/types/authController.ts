import type { NextFunction, Request, Response } from "express";

type AuthRequestHandler<T = any> = (
	req: Request<T>,
	res: Response,
	next?: NextFunction,
) => any;

export type { AuthRequestHandler };
