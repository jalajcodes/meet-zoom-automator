import { useRef } from "react";
import useScript from "../hooks/useScript";

export default function GoogleLogin({
  onGoogleSignIn = () => {},
  text = "signin_with",

  // feel free to add more options here
}) {
  const googleSignInButton = useRef(null);

  useScript("https://accounts.google.com/gsi/client", () => {
    window.google.accounts.id.initialize({
      client_id: "792806970704-k4cgfmocobam5fu01cs5h7unrs4ehig8.apps.googleusercontent.com",
      callback: onGoogleSignIn,
      scope: "https://www.googleapis.com/auth/calendar",
    });
    window.google.accounts.id.renderButton(
      googleSignInButton.current,
      { theme: "outline", size: "large", text, width: "250" } // customization attributes
    );
  });

  return <div className="test" ref={googleSignInButton}></div>;
}