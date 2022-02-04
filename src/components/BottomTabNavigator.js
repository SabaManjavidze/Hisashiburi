import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Button } from 'react-native-paper';
import { primary_color } from './variables';
import { useNavigation } from '@react-navigation/native';

export default function BottomTabNavigator() {
  const navigation=useNavigation()
  return (
    <View style={styles.container}>
    <Button 
      icon={"home"}
      onPress={()=>{
        navigation.navigate("Home")
      }}
    >
      <Text>Home</Text>
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

const styles = StyleSheet.create({
  container: {
    backgroundColor:primary_color,
    borderColor:"black",
    borderWidth:1,
    flexDirection:"row",
    justifyContent:"space-around"
  },
})
