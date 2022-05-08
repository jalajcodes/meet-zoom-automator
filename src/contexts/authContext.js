import { createContext, useContext, useState } from "react";
import ApiCalendar from "react-google-calendar-api";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    JSON.parse(localStorage.getItem("isLoggedIn"))
  );
  const [userProfile, setUserProfile] = useState({});

  const handleLogin = () => {
    ApiCalendar.handleAuthClick()
      .then(() => {
        console.log("sign in succesful!");
        localStorage.setItem("isLoggedIn", true);
        setIsLoggedIn(true);
      })
      .catch((e) => {
        console.error(`sign in failed ${e}`);
      });
  };

  const handleLogout = () => {
    ApiCalendar.handleSignoutClick();
    setIsLoggedIn(false);
    setUserProfile({});

    localStorage.setItem("isLoggedIn", false);
    localStorage.setItem("userProfile", {});
  };

  const fetchProfile = async () => {
    ApiCalendar.onLoad(() => {
      const userProfile = ApiCalendar.getBasicUserProfile();
      const profileDetails = {
        name: userProfile.getName(),
        email: userProfile.getEmail(),
        picture: userProfile.getImageUrl(),
      };
      setUserProfile(profileDetails);

      localStorage.setItem("userProfile", JSON.stringify(profileDetails));
    });
  };

  const value = {
    handleLogin,
    handleLogout,
    isLoggedIn,
    fetchProfile,
    userProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
