import { StyleSheet, Text,Dimensions, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { primary_color,main_color } from './variables';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default function ChapterNav({setChapter,setIndex,idx,chapters,navigation}){
    return (
        <View style={{
            justifyContent:"space-between",
            flexDirection:"row",
            alignItems:'center',
            backgroundColor:main_color,
            width:"100%",
            }}>
             <TouchableOpacity style={styles.prev_btn} onPress={()=>{
               const prev = idx+1
               if (chapters[prev]!=null) {
                 setChapter(chapters[prev]);
                 setIndex(prev)
               }else{
                  navigation.goBack()
               }
             }}>
               <Text style={{color:"white"}}>Previous</Text>
             </TouchableOpacity>
             <TouchableOpacity style={styles.next_btn} onPress={()=>{
               const next = idx-1
               if (chapters[next]!=null) {
                setChapter(chapters[next]);
                setIndex(next)
              }else{
                navigation.goBack()
              }
             }}>
               <Text style={{color:"white"}}>Next</Text>
             </TouchableOpacity>
          </View>
    );
}
const styles = StyleSheet.create({
    prev_btn:{
      width:windowWidth*0.35,
      height:"60%",
      margin:10,
      borderRadius:20,
      alignItems:"center",
      justifyContent:"center",
      backgroundColor:'#EA3128'
    },
    next_btn:{
      width:windowWidth*0.35,
      height:"60%",
      margin:10,
      borderRadius:20,
      alignItems:"center",
      justifyContent:"center",
      backgroundColor:primary_color
    }
  })