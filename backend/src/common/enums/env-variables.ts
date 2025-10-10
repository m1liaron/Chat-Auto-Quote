import { config } from "dotenv";

config();

const EnvVariables = {
	PORT: (process.env.PORT as string) || 3000,
	MONGO_URI: (process.env.MONGO_URI as string) || "",
	JWT_SECRET: (process.env.JWT_SECRET as string) || "",
	JWT_LIFETIME: (process.env.JWT_LIFETIME as string) || "1h",
} as const;

export { EnvVariables };
