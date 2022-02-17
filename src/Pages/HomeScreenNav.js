import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MangaDetails from "./MangaDetails";
import ChapterPage from "./ChapterPage";
import { main_color } from "../components/variables";
import HomePage from "./HomePage";
import TopManga from "./TopManga";

export default function HomeScreenNav({ navigation, route }) {
  const Stack = createNativeStackNavigator();
  const mangaDetailsHeader = {
    headerStyle: {
      backgroundColor: main_color,
      color: "white",
      borderBottomWidth: 2,
      borderBottomColor: "black",
    },
    headerTitleStyle: {
      color: "white",
      fontFamily: "notoserif",
    },
    headerTintColor: "white",
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        options={{ headerShown: false }}
        component={HomePage}
        listeners={{
          focus: () => {
            navigation.setOptions({
              tabBarStyle: { display: "flex", backgroundColor: main_color },
            });
          },
        }}
      />
      <Stack.Screen
        name="MangaDetails"
        options={mangaDetailsHeader}
        component={MangaDetails}
        listeners={{
          focus: () => {
            navigation.setOptions({
              tabBarStyle: { display: "flex", backgroundColor: main_color },
            });
          },
        }}
      />
      <Stack.Screen
        name="ChapterPage"
        options={mangaDetailsHeader}
        component={ChapterPage}
      />
    </Stack.Navigator>
  );
}
