import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { getProfile } from "../Services/MalServices";

export const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [user_loading, setUserLoading] = useState(true);

  const get_token = async () => {
    const token = await AsyncStorage.getItem("access_token");
    console.log(token ? "there is token" : "there is no token");
    if (token) {
      setToken(token);
      const user = await getProfile(token);
      console.log(user ? `there is user ${user.name}` : "there is no user");
      const user_data = {
        user_id: user.id,
        user_name: user.name,
        picture: user.picture,
      };
      setUser(user_data);
      setUserLoading(false);
    }
  };
  useEffect(() => {
    get_token();
  }, []);

  return (
    <AuthContext.Provider
      value={{ token, setToken, user, setUser, user_loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
