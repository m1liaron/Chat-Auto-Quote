declare global {
	namespace FB {
		interface AuthResponse {
			accessToken: string;
			expiresIn: number;
			signedRequest: string;
			userID: string;
		}

		interface StatusResponse {
			status: "connected" | "not_authorized" | "unknown";
			authResponse?: AuthResponse;
		}

		function init(params: {
			appId: string;
			cookie?: boolean;
			xfbml?: boolean;
			version: string;
		}): void;

		function login(
			callback: (response: StatusResponse) => void,
			options?: { scope?: string },
		): void;

		function getLoginStatus(callback: (response: StatusResponse) => void): void;
	}

	interface Window {
		FB: typeof FB;
		fbAsyncInit: () => void;
	}
}

export {};
