import React, { useEffect, useState } from 'react'
import { View, Text, Image, TouchableOpacity, ScrollView, Dimensions, useWindowDimensions, StyleSheet, SafeAreaView } from 'react-native'
import ChapterItem from '../components/ChapterItem';
import { main_url,domain, img_url } from '../components/variables'

export const fetchData = async (manga_id) =>{
    const url = `${main_url}/manga/${manga_id}`
    const data = await fetch(url)
    const json = await data.json()
    return json
}

export default function MangaDetails({navigation,route}) {
    const {item} = route.params
    const {manga_id,title} = item
    const [chapters, setChapters] = useState([])
    const [loaded, setLoaded] = useState(false)

    const fetchChapters = async ()=>{
        navigation.setOptions({title:title})
        const json = await fetchData(manga_id)
        setChapters(json)
        setLoaded(true)
    }
    
    useEffect(() => {
        fetchChapters()
    }, [])
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{alignItems:'center'}}>
                <Image source={{uri:`${domain}${img_url}${manga_id}.jpg`}} style={{width:200,height:400}} />
                <View style={{alignItems:"baseline",marginTop:25,width:"100%",height:"100%",backgroundColor:"#282A36"}}>
                    {
                        loaded?(
                            chapters.map((child,i)=>
                            {
                                return (
                                    <ChapterItem 
                                    chapters={chapters} 
                                    key={child.chapter_num} 
                                    child={child} 
                                    navigation={navigation} 
                                    manga_id={manga_id} 
                                    index={i} 
                                    />
                                    )
                                })
                                )
                                :
                                (
                                    <View style={{width:"100%",height:"100%",backgroundColor:"#282A36"}}></View>
                                    )
                                }
                </View>
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        width:"100%",
        height:"100%",
        backgroundColor:"#282A36"
    },
  })