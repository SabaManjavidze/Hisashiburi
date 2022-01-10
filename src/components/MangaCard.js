import React from 'react'
import { View, Text,Image, TouchableOpacity, Dimensions, StyleSheet } from 'react-native'
import { fetchData } from '../Pages/MangaDetails';
import { domain,img_url, primary_color } from './variables'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function MangaCard({navigation,item}) {

    const goToChapter = async ( i )=>{
        const chapters = await fetchData(item.manga_id)
        navigation.navigate("ChapterPage",{
            chapters:chapters,
            manga_id:item.manga_id,
            index:i
        })
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity 
                style={{flex:1,flexDirection:"row",alignItems:'center'}} 
                onPress={()=>navigation.navigate("MangaDetails",{item:item})}
            >

                <Image source={{uri:`${domain}${img_url}${item.manga_id}.jpg`}} 
                style={styles.image}/>

                <View style={{
                    flex:1,
                    alignItems:'center',
                    justifyContent:'center'
                    }}>
                    <View style={{
                        flex:2,
                        justifyContent:'center',
                        alignItems:'center',
                        }}>
                        <Text style={{color:"white",textAlign:"center",fontSize:20}}>{item.title}</Text>
                    </View>
                    <View style={{
                        flex:1,
                        width:"100%",
                        }}>
                        {
                            item.chapters.map((child,i)=>{
                                return(
                                    <View key={i} style={{
                                        flex:1,
                                        flexDirection:'row',
                                        justifyContent:'space-between',
                                        marginHorizontal:0
                                    }}>
                                        <View style={{flex:3}}>
                                            <Text 
                                                onPress={()=>goToChapter(i)} 
                                                style={{color:primary_color,textAlign:'center',fontSize:13}}
                                                >
                                                {child.chap_title}
                                            </Text>
                                        </View>
                                        <View style={{flex:1,justifyContent:'center'}}>
                                            <Text style={{color:"gray",fontSize:10,textAlign:'center'}}>
                                                {child.upload_date}
                                            </Text>
                                        </View>
                                    </View>
                                )
                            })
                        }
                    </View>
                </View>
            </TouchableOpacity>
        </View> 
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical:10,
        width:windowWidth-20,
        backgroundColor:"#2F2C4B",
        borderRadius:10,
        borderColor:primary_color,
        borderWidth:2,
        padding:10,
    },
    image:{
        width:115,
        height:170,
        borderTopLeftRadius:10,
        borderBottomLeftRadius:10,
    },
    title:{
        color:"white",
        maxWidth:windowWidth/4,
    },
  })