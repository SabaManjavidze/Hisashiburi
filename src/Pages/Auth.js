import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  auth_url,
  clg,
  main_color,
  MAL_color,
  NOT_FOUND_IMAGE,
  primary_color,
  STATE_VAR,
  token_url,
} from "../components/variables";
import axios from "axios";
import { gql, useMutation } from "@apollo/client";
import { getProfile } from "../Services/MalServices";
import { useAuth } from "../Hooks/useAuth";
import { CREATE_USER } from "../graphql/Mutations";
import { ActivityIndicator, Avatar, IconButton } from "react-native-paper";
import * as WebBrowser from "expo-web-browser";
import { useFonts } from "expo-font";

export default function Auth({ navigation, route }) {
  const { setToken, setUser } = useAuth();
  const [addUser, { error, data }] = useMutation(CREATE_USER);
  const [loading, setLoading] = useState(false);

  const [loaded] = useFonts({
    Mal: require("../../assets/MalFont.ttf"),
  });
  const saveDatainAsyncStorage = async (data) => {
    const { access_token, refresh_token, expires_in } = data;
    try {
      await AsyncStorage.setItem("access_token", access_token);
      await AsyncStorage.setItem("refresh_token", refresh_token);
      await AsyncStorage.setItem("expires_in", expires_in.toString());
    } catch (error) {
      alert(JSON.stringify(error, null, 2));
    }
  };
  const LogIn = async (authorization_code) => {
    try {
      const { data } = await axios.post(token_url, {
        code: authorization_code,
        state: STATE_VAR,
      });
      saveDatainAsyncStorage(data);
      const user = await getProfile(data.access_token);
      const { id, name, picture } = user;
      const user_data = {
        user_id: id,
        user_name: name,
        picture: picture,
      };
      try {
        await addUser({
          variables: {
            ...user_data,
          },
        });
      } catch (error) {
        const graphql_error = error.networkError.result.errors[0].message;
        console.log(graphql_error ? `graphql error ${graphql_error}` : error);
        // console.log(JSON.stringify(error, null, 2));
      }
      setToken(access_token);
      setUser(user_data);
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
    }
  };
  useEffect(() => {
    if (route.params && route.params.code) {
      setLoading(true);
      LogIn(route.params.code);
    }
  }, [route]);

  return (
    <View
      style={{
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: main_color,
      }}
    >
      {loading ? (
        <ActivityIndicator size="large" color={primary_color} />
      ) : (
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => {
            WebBrowser.openAuthSessionAsync(
              auth_url
              // "http://192.168.0.109:3000/auth"
              // "exp://192.168.0.109:19000/--/auth"
            );
          }}
          style={{
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            backgroundColor: MAL_color,
            padding: 15,
            borderRadius: 15,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 20,
              letterSpacing: 0.2,
              // fontFamily: "Roboto",
              fontFamily: loaded ? "Mal" : "Roboto",
            }}
          >
            Sign in with MyAnimeList
          </Text>
        </TouchableOpacity>
      )}
    </View>
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
