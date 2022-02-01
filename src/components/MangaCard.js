import React, { useEffect, useState } from 'react'
import { View, Text,Image, TouchableOpacity, Dimensions, StyleSheet, AsyncStorage } from 'react-native'
import { PanGestureHandler } from 'react-native-gesture-handler';
import { IconButton } from 'react-native-paper';
import Animated, { runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { fetchData } from '../Pages/MangaDetails';
import { addToFavorites, checkIfFavorited, removeFromFavorites } from './FavServices';
import { domain,img_url, primary_color } from './variables'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function MangaCard({route,navigation,item,data,favs,setdata}) {
    const [fav, setfav] = useState(false);
    const [star, setstar] = useState(not_fav_icon);
    const goToChapter = async ( i )=>{
        const {chapters} = await fetchData(item.manga_id)
        navigation.navigate("ChapterPage",{
            chapters:chapters,
            manga_id:item.manga_id,
            index:i
        })
    }
    const fav_icon ="star"
    const not_fav_icon="star-outline"

    const translateX = useSharedValue(0)
    const TRANSLATE_X_THRESHOLD= -windowWidth*0.5

    const removeSwiped=async ()=>{
        const new_data = data.filter(child=>child.manga_id!=item.manga_id)
        setdata(new_data)
        removeFromFavorites(favs,item.manga_id)
    }
    const panGesture = useAnimatedGestureHandler({
        onActive:(event)=>{
            translateX.value=event.translationX
        },
        onEnd:()=>{
            const dissmised = translateX.value<TRANSLATE_X_THRESHOLD 
            if(dissmised){
                //   translateX.value=withTiming(-windowWidth)
                runOnJS(removeSwiped)(setdata,data,favs)
            }else{
                translateX.value = withTiming(0)
            }
        }
    })
    const rStyle = useAnimatedStyle(()=>({
        transform:[
            {
                translateX:translateX.value
            }
        ]
    }))
    const addToFavs = ()=>{
        addToFavorites(favs,item.manga_id)
        setfav(true)
    }
    const removeFromFavs = ()=>{
        removeFromFavorites(favs,item.manga_id)
        setfav(false)
    }
    const checkFavorites=async()=>{
        const isfav = await checkIfFavorited(favs,item.manga_id)
        setfav(isfav)
    }
    const onPress=async()=>{
        if (fav) {
            removeFromFavs()
        }else{
            addToFavs()
        }
    }
    useEffect(() => {
        if (fav) {
            setstar(fav_icon)
        }else{
            setstar(not_fav_icon)
        }
    }, [fav]);
    
    useEffect(() => {
        checkFavorites()
    }, []);
        const atHome = route.name=="Home"
    return (
        <Animated.View style={{width:"100%",alignItems:"center"}}>
            <Animated.View style={{
                position:"absolute",
                height:"90%",
                right:"5%",
                width:"20%",
                justifyContent:"center",
                alignItems:"center",
            }}>
                <IconButton icon="delete" color='red' size={40} style={{
                    // height:"100%",
                    alignItems:"center",
                    justifyContent:"center"
                }}/>
            </Animated.View>
            <PanGestureHandler enabled={route.name=="Favorites"&&true} onGestureEvent={panGesture}>
            <Animated.View style={[rStyle,styles.container]}>

            <View
                style={{flex:1,flexDirection:"row",alignItems:'center'}} 
            >

            <TouchableOpacity 
                onPress={()=>navigation.navigate("MangaDetails",{item:item})}
            >
                <Image source={{uri:item.img_url?item.img_url:`${domain}${img_url}${item.manga_id}.jpg`}} 
                style={styles.image}/>
            </TouchableOpacity>

                <View style={{
                    flex:1,
                    alignItems:'center',
                    justifyContent:'center'
                    }}>
                    <View style={{
                        flex:1,
                        width:"100%",
                        justifyContent:atHome?'space-between':"center",
                        flexDirection:"row"
                        }}>
                        <View style={{flex:4,justifyContent:"center"}}>
                            <Text style={{color:"white",textAlign:"center",fontSize:20}}>{item.title}</Text>
                        </View>
                        {atHome&&<View style={{flex:1,alignItems:"center"}}>
                            <IconButton icon={star} onPress={()=>onPress()} color={primary_color}/>
                        </View>}
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
                                        <View style={{flex:3,alignItems:"center"}}>
                                            <Text 
                                                onPress={()=>goToChapter(i)} 
                                                style={{
                                                    color:primary_color,
                                                    borderColor:primary_color,
                                                    borderWidth:0.2,
                                                    width:"80%",
                                                    textAlign:'center',
                                                    fontSize:13
                                                }}
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
                </View>
                </Animated.View>
                </PanGestureHandler>
            </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical:10,
        width:windowWidth-20,
        backgroundColor:"#2F2C4B",
        borderRadius:10,
        flexDirection:"row",
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