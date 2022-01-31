import React,{useRef,useEffect,useState} from 'react';
import { StyleSheet,View,ScrollView,SafeAreaView, Text,} from 'react-native';
import HomePage from './src/Pages/HomePage';
import MangaDetails from './src/Pages/MangaDetails';
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import { NavigationContainer} from '@react-navigation/native';
import ChapterPage from './src/Pages/ChapterPage';
import { Provider,BottomNavigation,IconButton,Button, TouchableRipple, } from 'react-native-paper';
import { main_color, primary_color } from './src/components/variables';
import { StatusBar } from 'expo-status-bar';
import Favorites from './src/Pages/Favorites';
import BottomTabNavigator from './src/components/BottomTabNavigator';

export default function App() {
  
  const Stack = createNativeStackNavigator()
  const mangaDetailsHeader={
    headerStyle:{
      backgroundColor:main_color,
      color:"white",
      borderBottomWidth:2,
      borderBottomColor:"black"
    },
    headerTitleStyle:{
      color:"white",
      fontFamily:"notoserif",
    },
    headerTintColor:"white",
    
  }
    return (
      <Provider>
      <NavigationContainer>
        <StatusBar 
                animated={true}
                backgroundColor="#282A41"
                hidden={false}
                style={'light'}
            />
        <Stack.Navigator>
          <Stack.Screen name="Home" options={{headerShown:false}} component={HomePage} />
          <Stack.Screen name="MangaDetails" options={mangaDetailsHeader} component={MangaDetails} />
          <Stack.Screen name="ChapterPage" options={mangaDetailsHeader} component={ChapterPage} />
          <Stack.Screen name="Favorites" options={mangaDetailsHeader} component={Favorites} />
        </Stack.Navigator>

        <TouchableRipple rippleColor={main_color}>
          <BottomTabNavigator/>
        </TouchableRipple>

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
