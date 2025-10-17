import type { GoogleCredentialResponse } from "@react-oauth/google";

interface AuthFormProps {
	handleGoogleLogin: (credentials: GoogleCredentialResponse) => Promise<any>;
}

export type { AuthFormProps };
