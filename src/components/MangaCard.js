import React, { useEffect, useRef, useState } from 'react'
import { View, Text,Image, TouchableOpacity, Dimensions, StyleSheet, AsyncStorage } from 'react-native'
import { PanGestureHandler } from 'react-native-gesture-handler';
import { IconButton } from 'react-native-paper';
import Animated, { runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { fetchData } from '../Pages/MangaDetails';
import { addToFavorites, checkIfFavorited, removeFromFavorites } from './FavServices';
import { domain,img_url, primary_color } from './variables'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function MangaCard({route,navigation,item,favs,onDismiss,simultHandler}) {
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
    const contRef = useRef(null)
    const fav_icon ="star"
    const not_fav_icon="star-outline"

    const translateX = useSharedValue(0)
    const opacity = useSharedValue(1);
    // const height = useSharedValue(contRef.current.height);
    const TRANSLATE_X_THRESHOLD= -windowWidth*0.5


    const panGesture = useAnimatedGestureHandler({
        onActive:(event)=>{
            translateX.value=event.translationX
        },
        onEnd:()=>{
            const dissmised = translateX.value<TRANSLATE_X_THRESHOLD 
            if(dissmised){
                  translateX.value=withTiming(-windowWidth)
                runOnJS(onDismiss)(item.manga_id)
            }else{
                translateX.value = withTiming(0)
            }
        }
    })
    const rContainerStyle = useAnimatedStyle(() => {
        return {
        //   height: itemHeight.value,
          opacity: opacity.value,
        };
      });
    const rStyle = useAnimatedStyle(()=>({
        transform:[
            {
                translateX:translateX.value
            }
        ]
    }))
    const rIconContainerStyle = useAnimatedStyle(() => {
        const opacity = withTiming(
          translateX.value < -windowWidth*0.2 ? 1 : 0
        );
        return { opacity };
      });
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
        <Animated.View ref={contRef} style={[rContainerStyle,{width:"100%",height:windowHeight*0.25,alignItems:"center"}]}>

            <Animated.View style={[rIconContainerStyle,styles.delete_container]}>
                <IconButton icon="delete-outline" color='#a91ce6' size={40} style={{
                    // height:"100%",
                    alignItems:"center",
                    justifyContent:"center"
                }}/>
            </Animated.View>

            <PanGestureHandler simultaneousHandlers={simultHandler} enabled={route.name=="Favorites"&&true} onGestureEvent={panGesture}>
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
                        height:"50%",
                        flexDirection:"row"
                        }}>
                        <View style={{justifyContent:"center",alignItems:"center",width:"90%"}}>
                            <Text style={{color:"white",textAlign:"center",maxWidth:"80%"}}>{item.title}</Text>
                        </View>
                        {atHome&&<View style={{alignItems:"center",left:"85%",bottom:"50%",position:"absolute"}}>
                            <IconButton icon={star} onPress={()=>onPress()} color={primary_color}/>
                        </View>}
                    </View>
                    <View style={{
                        flex:1,
                        width:"100%",
                        height:"50%",
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
                                                {child.chap_title.length>18?`${child.chap_title.substring(0,18)}...`:child.chap_title}
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
    delete_container:{
        position:"absolute",
        height:"90%",
        right:"5%",
        width:"20%",
        justifyContent:"center",
        alignItems:"center",
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