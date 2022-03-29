import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TopManga from "../Pages/TopManga";
import MangaDetails from "../Pages/MangaDetails/MangaDetails";
import { main_color } from "./variables";
import ChapterPage from "../Pages/ChaptersPage/ChapterPage";

export default function TopMangaScreenNav({ navigation, route }) {
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
        name="Top Manga"
        options={{ headerShown: false }}
        component={TopManga}
        listeners={{
          focus: () => {
            navigation.setOptions({
              tabBarStyle: {
                display: "flex",
                backgroundColor: main_color,
                borderTopColor: "black",
              },
              headerShown: true,
            });
          },
        }}
      />
      <Stack.Screen
        name="MangaDetails"
        options={{ headerShown: false }}
        component={MangaDetails}
        listeners={{
          focus: () => {
            navigation.setOptions({
              tabBarStyle: {
                display: "flex",
                backgroundColor: main_color,
                borderTopColor: "black",
              },
              headerShown: false,
            });
          },
        }}
      />
      <Stack.Screen
        name="ChapterPage"
        options={{ headerShown: false }}
        component={ChapterPage}
        listeners={{
          focus: () => {
            navigation.setOptions({
              tabBarStyle: {
                display: "none",
                backgroundColor: main_color,
                borderTopColor: "black",
              },
              headerShown: false,
            });
          },
        }}
      />
    </Stack.Navigator>
  );
}
