import React, { useRef, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  Text,
  AsyncStorage,
  Alert,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Avatar } from "react-native-paper";
import { main_color, paper_primary_color, primary_color } from "./variables";
import { StatusBar } from "expo-status-bar";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Auth from "../Pages/Auth";
import ProfilePage from "../Pages/ProfilePage";
import HomeScreenNav from "../Pages/HomeScreenNav";
import TopManga from "../Pages/TopManga";
import { useAuth } from "../Hooks/useAuth";
import TopMangaScreenNav from "./Testing/TopMangaStack";

export default function MainNavigation() {
  const Tab = createBottomTabNavigator();
  const { token, setToken } = useAuth();
  const [loaded, setLoaded] = useState(false);

  const isAuthenticated = async () => {
    try {
      const value = await AsyncStorage.getItem("access_token");
      setToken(value);
      setLoaded(true);
    } catch (error) {
      alert(error, "There was an error");
    }
  };
  useEffect(() => {
    isAuthenticated();
  }, []);
  const mangaDetailsHeader = {
    headerStyle: {
      backgroundColor: main_color,
      borderBottomWidth: 0.5,
      borderBottomColor: "black",
    },
    headerTitleStyle: {
      color: "white",
      fontFamily: "notoserif",
    },
    headerTintColor: "white",
  };
  const renderItem = (
    focused,
    icon_name,
    color,
    not_active_name = "outline"
  ) => {
    return (
      <Avatar.Icon
        icon={focused ? icon_name : `${icon_name}-${not_active_name}`}
        size={30}
        color={color}
        style={{
          backgroundColor: focused ? paper_primary_color : null,
        }}
      />
    );
  };
  return (
    <>
      {loaded && (
        <NavigationContainer>
          <StatusBar
            animated={false}
            backgroundColor={main_color}
            hidden={false}
            style={"light"}
          />
          <Tab.Navigator
            screenOptions={{
              tabBarStyle: {
                backgroundColor: main_color,
                display: "flex",
                borderTopColor: "black",
              },
              tabBarActiveTintColor: "white",
            }}
          >
            <Tab.Screen
              name="Home Screen"
              options={{
                headerShown: false,
                tabBarIcon: ({ focused, color }) =>
                  renderItem(focused, "home", color),
                tabBarLabel: "Home",
                tabBarStyle: { borderTopColor: "black" },
              }}
              component={HomeScreenNav}
            />
            <Tab.Screen
              name="Top Manga Screen"
              options={{
                headerTitle: "Top Manga",
                title: "Top Manga",
                tabBarIcon: ({ focused, color }) =>
                  renderItem(focused, "format-list-bulleted", color, "square"),
                ...mangaDetailsHeader,
              }}
              component={TopMangaScreenNav}
            />
            {token !== null || (
              <Tab.Screen
                name="LogIn"
                component={Auth}
                options={{
                  headerStyle: {
                    backgroundColor: main_color,
                    borderBottomColor: "black",
                    borderBottomWidth: 0.5,
                  },
                  headerTitleStyle: { color: "white" },
                  tabBarIcon: ({ focused, color }) =>
                    renderItem(focused, "account-circle", color),
                }}
              />
            )}
            {token !== null && (
              <Tab.Screen
                name="Profile"
                options={{
                  // headerShown: false,
                  headerStyle: {
                    backgroundColor: main_color,
                    borderBottomColor: "#262840",
                    borderBottomWidth: 1.5,
                  },
                  headerTitleStyle: { color: "white" },
                  tabBarIcon: ({ focused, color }) =>
                    renderItem(focused, "account", color),
                }}
                component={ProfilePage}
              />
            )}
          </Tab.Navigator>
        </NavigationContainer>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#282A41",
    width: "100%",
  },
});
