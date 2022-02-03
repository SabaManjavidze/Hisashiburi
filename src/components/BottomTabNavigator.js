import { View, Text } from 'react-native';
import React from 'react';
import { Button } from 'react-native-paper';
import { primary_color } from './variables';
import { useNavigation } from '@react-navigation/native';

export default function BottomTabNavigator() {
    const navigation=useNavigation()
  return (
    <View style={{backgroundColor:primary_color,flexDirection:"row",justifyContent:"space-around"}}>
    <Button 
      icon={"home"}
      onPress={()=>{
        navigation.navigate("Home",{refresh:"hello"})
      }}
    >
      <Text style={{color:"black"}}>Home</Text>
    </Button>
    <Button 
      icon={"star"}
      onPress={()=>{
        navigation.navigate("Favorites")
      }}
    >
      <Text>Favorites</Text>
      </Button>
  </View>
  );
}
