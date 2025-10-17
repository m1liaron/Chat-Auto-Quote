import { EnvVariables } from "../common/enums/env-variables.js";

const validateEnvVariables = () => {
    (Object.keys(EnvVariables) as Array<keyof typeof EnvVariables>).forEach((key) => {
        const value = EnvVariables[key];

        if (typeof value === "string") {
            if (value.trim().length === 0) {
                console.error(`Error🔴: ${key} is empty`);
                process.exit(1);
            }
        } else if (value === undefined || value === null) {
            console.error(`${key} is not set`);
            process.exit(1);
        }
    })
};

export { validateEnvVariables };