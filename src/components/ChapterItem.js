import React, { useContext } from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function ChapterItem({navigation,manga_id,chapters,child,index}) {
    return (
        <View style={styles.chapter_container}>
        <TouchableOpacity style={{width:"100%"}} onPress={()=>navigation.navigate("ChapterPage",{
            index:index,
            manga_id:manga_id,
            chapters:chapters
            })
        }>
            <Text style={{fontSize:15,color:"white",textAlign:'center'}}>{child.chap_title}</Text>
        </TouchableOpacity>
    </View>
    )
}

const styles = StyleSheet.create({
    chapter_container: {
        padding:10,
        borderColor:"cyan",
        borderWidth:0.6,
        borderTopWidth:0.2,
        width:windowWidth
    },
  })