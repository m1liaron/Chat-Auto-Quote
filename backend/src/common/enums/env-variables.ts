import { config } from "dotenv";

config();

const EnvVariables = {
	PORT: (process.env.PORT as string) || 3000,
	MONGO_URI: (process.env.MONGO_URI as string) || "",
	JWT_SECRET: (process.env.JWT_SECRET as string) || "",
	JWT_LIFETIME: (process.env.JWT_LIFETIME as string) || "1h",
	API_KEY_NINJAS: (process.env.API_KEY_NINJAS as string) || "",
} as const;

export { EnvVariables };
