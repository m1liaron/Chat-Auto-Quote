import { StatusCodes } from "http-status-codes";
import type { AuthRequestHandler } from "../common/types/authController.js";
import { User } from "../models/models.js";

const getUser: AuthRequestHandler = async (req, res) => {
	try {
		const { userId } = req.user;

		const user = await User.findById(userId);

		res.status(StatusCodes.OK).json(user);
	} catch (error) {
		res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ error: true, message: error || "Server error" });
	}
};

export { getUser };
