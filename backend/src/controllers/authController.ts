import { StatusCodes } from "http-status-codes";
import type { RequestHandler } from "../common/types/types.js";
import { User } from "../models/User.model.js";

const register: RequestHandler = async (req, res) => {
	try {
		const { firstName, lastName, email, password } = req.body;

		if (!firstName || !lastName || !email || !password) {
			res.status(StatusCodes.BAD_REQUEST).json({ message: "Missing fields" });
			return;
		}

		const existUser = await User.findOne({ email });
		if (existUser) {
			res.status(StatusCodes.BAD_REQUEST).json({
				error: true,
				message: `User with email: ${email}, already exist`,
			});
			return;
		}

		const user = await User.create({ firstName, lastName, email, password });
		const token = user.createJWT();

		res.status(StatusCodes.CREATED).json({ user, token });
	} catch (error) {
		res
			.status(StatusCodes.BAD_REQUEST)
			.json({ error: true, message: `Error during register: ${error}` });
	}
};

const login: RequestHandler = async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			res.status(StatusCodes.BAD_REQUEST).json({ message: "Missing fields" });
			return;
		}

		const existUser = await User.findOne({ email });
		if (!existUser) {
			res
				.status(StatusCodes.BAD_REQUEST)
				.json({ error: true, message: `User with email: ${email}, not exist` });
			return;
		}

		const token = existUser.createJWT();

		res.status(StatusCodes.CREATED).json({ user: existUser, token });
	} catch (error) {
		res
			.status(StatusCodes.BAD_REQUEST)
			.json({ error: true, message: `Error during register: ${error}` });
	}
};

export { register, login };
