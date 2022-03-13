import { View, Text } from "react-native";
import React from "react";
import { AuthProvider } from "./src/Hooks/useAuth";
import MainNavigation from "./src/components/MainNavigation";
import { Provider } from "react-native-paper";

export default function App() {
  return (
    <AuthProvider>
      <Provider>
        <MainNavigation />
      </Provider>
    </AuthProvider>
  );
}
