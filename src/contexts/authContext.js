import { createContext, useContext, useState } from "react";
import ApiCalendar from "react-google-calendar-api";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(JSON.parse(localStorage.getItem("isLoggedIn")));
  const [userProfile, setUserProfile] = useState(JSON.parse(localStorage.getItem("userProfile")));

  const handleLogin = () => {
    ApiCalendar.handleAuthClick()
      .then(() => {
        console.log("sign in succesful!");
        localStorage.setItem("isLoggedIn", true);
        setIsLoggedIn(true);
        fetchProfile();
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
    localStorage.setItem("userProfile", null);
  };

  const fetchProfile = () => {
    ApiCalendar.onLoad(async () => {
      const userProfile = await ApiCalendar.getBasicUserProfile();
      const profileDetails = {
        name: await userProfile.getName(),
        email: await userProfile.getEmail(),
        picture: await userProfile.getImageUrl(),
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
