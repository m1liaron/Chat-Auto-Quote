
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ApiPath, AppPath } from "@/common/enums";
import { useUser } from "@/contexts/UserProvider";
import { setLocalStorageItem } from "@/helpers";
import { localStorageState } from "@/common/constants";

declare global {
  interface Window {
    fbAsyncInit: () => void;
    FB: typeof FB;
  }
}

interface FacebookAuthResponse {
  accessToken: string;
  expiresIn: number;
  signedRequest: string;
  userID: string;
}

interface FacebookStatusResponse {
  status: "connected" | "not_authorized" | "unknown";
  authResponse?: FacebookAuthResponse;
}

export const FacebookLoginButton: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();

  useEffect(() => {
    window.fbAsyncInit = () => {
      window.FB.init({
        appId: import.meta.env.VITE_FACEBOOK_APP_ID,
        cookie: true,
        xfbml: true,
        version: "v18.0",
      });
    };

    ((d, s, id) => {
      const element = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      const js = d.createElement(s) as HTMLScriptElement;
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      element.parentNode?.insertBefore(js, element);
    })(document, "script", "facebook-jssdk");
  }, []);

  const handleFacebookLogin = () => {
    window.FB.login(
      async (response: FacebookStatusResponse) => {
        if (response.status === "connected" && response.authResponse) {
          try {
            const { accessToken } = response.authResponse;
            const res = await axios.post(`${ApiPath}/auth/facebook-login`, { accessToken });

            setUser(res.data.user);
            setLocalStorageItem(localStorageState.TOKEN, res.data.token);
            navigate(AppPath.Root);
          } catch (error) {
            console.error("Facebook login error:", error);
          }
        } else {
          console.log("User cancelled login or did not fully authorize.");
        }
      },
      { scope: "public_profile,email" }
    );
  };

  return (
    <button type="button" className="social-btn facebook" onClick={handleFacebookLogin}>
      Continue with Facebook
    </button>
  );
};
