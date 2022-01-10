import React,{useRef,useEffect,useState} from 'react';
import { StyleSheet,View,ScrollView,SafeAreaView, Text,} from 'react-native';
import HomePage from './src/Pages/HomePage';
import MangaDetails from './src/Pages/MangaDetails';
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import { NavigationContainer } from '@react-navigation/native';
import ChapterPage from './src/Pages/ChapterPage';
import { Provider } from 'react-native-paper';

export default function App() {
  
  const Stack = createNativeStackNavigator()
  const mangaDetailsHeader={
    headerStyle:{
      backgroundColor:"#18161B",
      color:"white"
    },
    headerTitleStyle:{
      color:"white",
      fontFamily:"notoserif"
    },
    headerTintColor:"white",
    
  }
    return (
      <Provider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" options={{headerShown:false}} component={HomePage} />
          <Stack.Screen name="MangaDetails" options={mangaDetailsHeader} component={MangaDetails} />
          <Stack.Screen name="ChapterPage" options={mangaDetailsHeader} component={ChapterPage} />
        </Stack.Navigator>
      </NavigationContainer>
      </Provider>

  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#282A41',
    width:'100%',
  },
})
