import axios from "axios";
import { EnvVariables } from "../common/enums/index.js";

const api = "https://api.api-ninjas.com/v1/quotes";

const getRandomQuote = async () => {
	try {
		const response = await axios.get(api, {
			headers: {
				"X-Api-Key": EnvVariables.API_KEY_NINJAS,
			},
		});
		return response.data[0];
	} catch (error) {
		console.error(error);
	}
};

export default getRandomQuote;
