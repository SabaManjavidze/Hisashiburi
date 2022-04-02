import { View, Alert, Text, StyleSheet, AsyncStorage } from "react-native";
import React, { useEffect, useState } from "react";
import {
  auth_url,
  CLIENT_ID,
  html,
  main_color,
  STATE_VAR,
  token_url,
} from "../components/variables";
import { WebView } from "react-native-webview";
import axios from "axios";
import { gql, useQuery } from "@apollo/client";
import { getProfile } from "../Services/MalServices";

export default function Auth({ navigation, route }) {
  const [show, setShow] = useState(false);
  const CreateUser = (user_id) => {
    const CREATE_USER = gql`
    {
      createUser(user_id:${user_id}) {
        picture
        user_id
        user_name
      }
    }
  `;
    const { loading, data, error } = useQuery(CREATE_USER);
  };
  const onNavStateChange = async (navigationState) => {
    const url = navigationState.url;
    if (url.includes("code=")) {
      const authorization_code = url.split("code=")[1].split("&")[0];
      // console.log(authorization_code);
      try {
        const { data } = await axios.post(token_url, {
          code: authorization_code,
          state: STATE_VAR,
        });
        console.log(data);
        await AsyncStorage.setItem("access_token", data.access_token);
        await AsyncStorage.setItem("refresh_token", data.refresh_token);
        await AsyncStorage.setItem("expires_in", data.expires_in);
        // const user = await getProfile(data.access_token);
        // console.log(user);
        // CreateUser(user.data.user_id);
        alert("Successfully logged in");
      } catch (error) {
        alert("erori iyo bichooo", error.response.data);
      }
      // navigation.navigate("Home");
    }
  };
  return (
    <WebView
      source={{
        // uri: "https://node-mal-oauth.herokuapp.com/auth",
        uri: "http://10.0.2.2:3000/auth",
      }}
      // onLoad={() => console.log("helloo")}
      // source={{
      //   html: `${html}
      //     <h1 style="color:white;font-size:60px;text-align:center;max-width:50%;right:27%;top:40%;position:absolute">
      //       Coming Soon! cuz im a lazy fuk
      //     </h1>
      //   </body>
      // </html>`,
      // }}
      onNavigationStateChange={(navigationState) =>
        onNavStateChange(navigationState)
      }
      style={{ backgroundColor: main_color }}
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
