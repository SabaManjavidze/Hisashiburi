import { View, Text } from "react-native";
import React from "react";
import { AuthProvider } from "./src/Hooks/useAuth";
import MainNavigation from "./src/components/MainNavigation";

export default function App() {
  return (
    <AuthProvider>
      <MainNavigation />
    </AuthProvider>
  );
}
