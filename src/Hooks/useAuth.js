import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { getProfile } from "../Services/MalServices";

export const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [user_loading, setUserLoading] = useState(true);

  const getUser = async () => {
    const stored_token = await AsyncStorage.getItem("access_token");
    console.log(stored_token ? "there is token" : "there is no token");
    if (stored_token) {
      setToken(stored_token);
      const user_data = await AsyncStorage.getItem("user");
      setUser(JSON.parse(user_data));
      setUserLoading(false);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ token, setToken, user, setUser, user_loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
