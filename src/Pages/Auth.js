import { View, Alert, Text, StyleSheet, AsyncStorage } from "react-native";
import React, { useState } from "react";
import { Button } from "react-native-paper";
import {
  auth_url,
  CLIENT_ID,
  main_color,
  STATE_VAR,
  token_url,
} from "../components/variables";
import { WebView } from "react-native-webview";
import axios from "axios";

export default function Auth({ navigation, route }) {
  const [show, setShow] = useState(false);

  const onNavStateChange = async (navigationState) => {
    const url = navigationState.url;
    if (url.includes("code")) {
      const authorization_code = url.split("code=")[1].split("&")[0];
      navigation.navigate("Home");
      try {
        const { data } = await axios.post(token_url, {
          code: authorization_code,
          state: STATE_VAR,
        });
        await AsyncStorage.setItem("access_token", data.access_token);
        await AsyncStorage.setItem("refresh_token", data.refresh_token);
        await AsyncStorage.setItem("expires_in", data.expires_in);
        Alert.alert("Successfully logged in");
      } catch (error) {
        Alert.alert("There was an error", error.response.data);
      }
    }
  };
  return (
    <WebView
      source={{ uri: auth_url }}
      onNavigationStateChange={onNavStateChange}
    />
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: main_color,
  },
});
