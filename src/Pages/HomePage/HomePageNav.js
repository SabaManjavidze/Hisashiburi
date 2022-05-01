import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MangaDetails from "../MangaDetails/MangaDetails";
import ChapterPage from "../ChaptersPage/ChapterPage";
import { main_color } from "../../components/variables";
import HomePage from "./HomePage";

export default function HomePageNav({ navigation, route }) {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        options={{ headerShown: false }}
        component={HomePage}
        listeners={{
          focus: () => {
            navigation.setOptions({
              tabBarStyle: {
                display: "flex",
                backgroundColor: main_color,
                borderTopColor: "black",
              },
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
            });
          },
        }}
      />
    </Stack.Navigator>
  );
}
