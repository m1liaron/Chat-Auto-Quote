import axios from "axios";
import type { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import { StatusCodes } from "http-status-codes";
import { getRandomAvatar } from "../api/getRandomAvatar.js";
import { EnvVariables } from "../common/enums/env-variables.js";
import type { RequestHandler } from "../common/types/types.js";
import { Chat } from "../models/Chat.model.js";
import { User } from "../models/User.model.js";

const googleClient = new OAuth2Client(EnvVariables.GOOGLE_API_CLIENT_ID);

interface GoogleRequestBody {
	credential: string;
}

type GoogleRequest = Request<{}, {}, GoogleRequestBody>;

const createChats = async (userId: string) => {
	const chats = ["Alex Freeman", "Josefina Cool", "Martin Luter"];
	for (let i = 0; i < chats.length; i++) {
		const randomAvatar = getRandomAvatar();
		await Chat.create({
			firstName: chats[i].split(" ")[0],
			lastName: chats[i].split(" ")[1] || "",
			avatar: randomAvatar,
			userId: userId,
		});
	}
};

const googleLogin = async (req: GoogleRequest, res: Response) => {
	const { credential } = req.body;
	if (!credential) {
		return res
			.status(StatusCodes.BAD_REQUEST)
			.json({ message: "Missing Google credential" });
	}
	try {
		const ticket = await googleClient.verifyIdToken({
			idToken: credential,
			audience: EnvVariables.GOOGLE_API_CLIENT_ID,
		});

		const payload = ticket.getPayload();
		if (!payload) {
			throw new Error("Invalid Google ID token");
		}
		const {
			sub: googleId,
			email,
			given_name: firstName,
			family_name: lastName,
			picture: avatar,
		} = payload;

		let user = await User.findOne({ email });
		if (!user) {
			user = await User.create({
				email,
				firstName,
				lastName,
				googleId,
				avatar,
			});
			const token = user.createJWT();

			createChats(user._id);

			res.status(StatusCodes.OK).json({ user, token });
		}
	} catch (error) {
		if (error instanceof Error) {
			res
				.status(StatusCodes.UNAUTHORIZED)
				.json({ message: `Google authentication failed: ${error.message}` });
		}
	}
};

const facebookLogin = async (req: Request, res: Response) => {
	const { accessToken } = req.body;
	if (!accessToken) {
		return res
			.status(StatusCodes.BAD_REQUEST)
			.json({ message: "Missing Facebook access token" });
	}

	try {
		const fbResponse = await axios.get(
			`https://graph.facebook.com/me?fields=id,first_name,last_name,email,picture&access_token=${accessToken}`,
		);
		const {
			id: facebookId,
			first_name,
			last_name,
			email,
			picture,
		} = fbResponse.data;

		let user = await User.findOne({ email });
		if (!user) {
			user = await User.create({
				email,
				firstName: first_name,
				lastName: last_name,
				facebookId,
				avatar: picture?.data?.url,
			});
		}

		const token = user.createJWT();
		res.status(StatusCodes.OK).json({ user, token });
	} catch (err) {
		console.error(err);
		res
			.status(StatusCodes.UNAUTHORIZED)
			.json({ message: "Facebook authentication failed" });
	}
};

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

		createChats(user._id);

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

export { register, login, googleLogin, facebookLogin };
