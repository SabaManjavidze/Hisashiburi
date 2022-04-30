import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MangaDetails from "../MangaDetails/MangaDetails";
import ChapterPage from "../ChaptersPage/ChapterPage";
import { main_color } from "../../components/variables";
import History from "./HistoryPage";
export default function HistoryPageNav({ navigation, route }) {
  const Stack = createNativeStackNavigator();
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
    headerShown: true,
  };

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="History"
        options={mangaDetailsHeader}
        component={History}
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
