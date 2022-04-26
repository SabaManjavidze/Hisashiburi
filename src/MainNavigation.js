import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Avatar } from "react-native-paper";
import {
  main_color,
  paper_primary_color,
  primary_color,
} from "./components/variables";
import { StatusBar } from "expo-status-bar";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useAuth } from "./Hooks/useAuth";
import Auth from "./Pages/Auth";
import HomePageNav from "./Pages/HomePage/HomePageNav";
import TopMangaScreenNav from "./Pages/TopMangaPage/TopMangaStack";
import ProfileScreenNav from "./Pages/ProfilePage/ProfileScreenNav";
import History from "./Pages/History/HistoryPage";

export default function MainNavigation() {
  const Tab = createBottomTabNavigator();

  const { token, setToken } = useAuth();

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
            component={HomePageNav}
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

          <Tab.Screen
            name="History"
            component={History}
            options={{
              headerStyle: {
                backgroundColor: main_color,
                borderBottomColor: "black",
                borderBottomWidth: 0.5,
              },
              headerTitleStyle: { color: "white" },
              tabBarIcon: ({ focused, color }) =>
                renderItem(focused, "clock", color),
            }}
          />
          {token === null ? (
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
          ) : (
            <Tab.Screen
              name="Profile Screen"
              options={{
                // headerShown: false,
                headerTitle: "Profile",
                title: "Profile",
                headerStyle: {
                  backgroundColor: main_color,
                  borderBottomColor: "#262840",
                  borderBottomWidth: 1.5,
                },
                headerTitleStyle: { color: "white" },
                tabBarIcon: ({ focused, color }) =>
                  renderItem(focused, "account", color),
              }}
              component={ProfileScreenNav}
            />
          )}
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#282A41",
    width: "100%",
  },
});
