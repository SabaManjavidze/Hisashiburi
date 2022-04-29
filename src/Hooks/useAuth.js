import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { getProfile } from "../Services/MalServices";

export const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const get_token = async () => {
    const token = await AsyncStorage.getItem("access_token");
    setToken(token);
    const user = await getProfile(token);
    setUser(user);
  };
  useEffect(() => {
    get_token();
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken, user }}>
      {children}
    </AuthContext.Provider>
  );
};
