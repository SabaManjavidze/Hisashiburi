import React from 'react'
import { useState,useRef,useEffect } from 'react';
import { StyleSheet,TextInput, Text, View,StatusBar,SafeAreaView, TouchableOpacity, Button, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';

const windowWidth = Dimensions.get('window').width;



export default function NavBar({chapters,setChap}) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState(chapters)
    const itemSelected = (item)=>{
      setChap(item)
    }


    return (
        <SafeAreaView style={{justifyContent:'center',alignItems:"center",flex:1,paddingBottom:50}}>
          <DropDownPicker
            open={open}
            value={value}
            schema={{
              label:"chap_title",
              selectable:true,
              value:"chap_title",
            }}
            placeholderStyle={{color:"#BB86FC"}}
            labelStyle={{color:"#BB86FC",fontWeight:"bold"}}
            style={{borderColor:"#BB86FC",borderWidth:2,maxWidth:windowWidth/1.03,backgroundColor:"#211B3A"}}
            items={items}
            autoScroll={true}
            theme={"DARK"}
            onSelectItem={(item)=>itemSelected(item)}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            itemKey={"chapter_num"}
          />
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
      backgroundColor: '#121212',
      width:'100%'
    },
    scrollView: {
      backgroundColor: 'white',
      marginHorizontal: 20,
    },
    image:{
      height:550,
      width:400,
      marginBottom:0,
      marginLeft:0,
      marginRight:0,
      resizeMode:"contain",
    },
    navigation:{
      flex:2,
      height:200,
      justifyContent:"space-around",
      flexDirection:"row",
      alignItems:"center",
      backgroundColor:"#121212"
    },
    prev_btn:{
      height:60,
      backgroundColor:'red',
      flex:1,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:15,
    },
    nex_btn:{
      height:60,
      backgroundColor:'purple',
      flex:1,
      borderRadius:15,
      justifyContent:'center',
      alignItems:'center'
    },
      secNavigation:{

      },
  })
