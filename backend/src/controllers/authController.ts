import { StatusCodes } from "http-status-codes";
import { getRandomAvatar } from "../api/getRandomAvatar.js";
import type { RequestHandler } from "../common/types/types.js";
import { Chat } from "../models/Chat.model.js";
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

		const randomUserAvatar = getRandomAvatar();
		const user = await User.create({
			firstName,
			lastName,
			email,
			password,
			avatar: randomUserAvatar,
		});
		const token = user.createJWT();

		const chats = ["Alex Freeman", "Josefina Cool", "Martin Luter"];
		for (let i = 0; i < chats.length; i++) {
			const randomAvatar = getRandomAvatar();
			await Chat.create({
				firstName: chats[i].split(" ")[0],
				lastName: chats[i].split(" ")[1] || "",
				avatar: randomAvatar,
				userId: user._id,
			});
		}

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
