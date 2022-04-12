import { View, Text, StyleSheet, AsyncStorage } from "react-native";
import React, { useEffect, useState } from "react";
import { main_color, STATE_VAR, token_url } from "../components/variables";
import { WebView } from "react-native-webview";
import axios from "axios";
import { gql, useMutation } from "@apollo/client";
import { getProfile } from "../Services/MalServices";
import { useAuth } from "../Hooks/useAuth";

export default function Auth({ navigation, route }) {
  // const [user, setUser] = useState();
  const { token, setToken } = useAuth();
  const CREATE_USER = gql`
    mutation CreateUser(
      $user_name: String!
      $user_id: Int!
      $picture: String!
    ) {
      createUser(user_id: $user_id, user_name: $user_name, picture: $picture) {
        user_name
      }
    }
  `;
  const [addUser, { loading, error, data }] = useMutation(CREATE_USER);
  // useEffect(() => {
  //   loading || console.log(JSON.stringify(data, null, 2));
  // }, [loading]);
  const onNavStateChange = async (navigationState) => {
    const url = navigationState.url;
    if (url.includes("code=")) {
      const authorization_code = url.split("code=")[1].split("&")[0];
      try {
        const { data } = await axios.post(token_url, {
          code: authorization_code,
          state: STATE_VAR,
        });
        const { access_token, refresh_token, expires_in } = data;

        await AsyncStorage.setItem("access_token", access_token);
        await AsyncStorage.setItem("refresh_token", refresh_token);
        await AsyncStorage.setItem("expires_in", expires_in.toString());

        const { id, name, picture } = await getProfile(access_token);
        console.log(id);
        try {
          await addUser({
            variables: {
              user_id: id,
              user_name: name,
              picture: picture,
            },
          });
        } catch (error) {
          // console.log(error.networkError.result.errors[0].message || error);
          console.log(JSON.stringify(error, null, 2));
        }
        setToken(access_token);
        // alert("Successfully logged in");
      } catch (error) {
        alert(error);
      }
    }
  };
  return (
    <WebView
      source={{
        uri: "https://node-mal-oauth.herokuapp.com/auth",
      }}
      onNavigationStateChange={(navigationState) =>
        onNavStateChange(navigationState)
      }
      style={{ backgroundColor: main_color }}
    />
    // <GraphqlTest />
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
