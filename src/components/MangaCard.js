import React from 'react'
import { View, Text,Image, TouchableOpacity, Dimensions, StyleSheet } from 'react-native'
import { fetchData } from '../Pages/MangaDetails';
import { domain,img_url } from './variables'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function MangaCard({navigation,item}) {
    return (
        <View key={item.manga_id} style={styles.container}>
            <TouchableOpacity 
                style={{flex:1,flexDirection:"row",alignItems:'center'}} 
                onPress={()=>navigation.navigate("MangaDetails",{item:item})}
            >
                <Image source={{uri:`${domain}${img_url}${item.manga_id}.jpg`}} style={{width:115,height:170}}/>
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
                                    <View style={{
                                        flex:1,
                                        flexDirection:'row',
                                        justifyContent:'space-between',
                                        marginHorizontal:5
                                    }}>
                                        <Text 
                                            onPress={async ()=>{
                                                const chapters = await fetchData(item.manga_id)
                                                navigation.navigate("ChapterPage",{
                                                    chapters:chapters,
                                                    manga_id:item.manga_id,
                                                    index:i
                                                })
                                            }} 
                                            style={{color:"magenta",fontSize:17}}
                                        >
                                            {child.chap_title}
                                        </Text>
                                        <Text style={{color:"gray",fontSize:10,marginTop:12}}>{child.upload_date}</Text>
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
        backgroundColor:"#494A62"
    },
    title:{
        color:"white",
        maxWidth:windowWidth/2,
    },
  })