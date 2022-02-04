import { View, Text, Dimensions, StyleSheet } from 'react-native';
import React from 'react';
import Animated, { runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import MangaCard from './MangaCard';
import { IconButton } from 'react-native-paper';
import { light_primary_color } from './variables';
import { PanGestureHandler } from 'react-native-gesture-handler';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function FavCard({item,favs,onDismiss,simultHandler,route,navigation}) {
    const translateX = useSharedValue(0)
    const opacity = useSharedValue(1);
    const itemHeight = useSharedValue(windowHeight*0.25);
    const TRANSLATE_X_THRESHOLD= -windowWidth*0.5

    const panGesture = useAnimatedGestureHandler({
        onActive:(event)=>{
            translateX.value=event.translationX
        },
        onEnd:()=>{
            const dissmised = translateX.value<TRANSLATE_X_THRESHOLD 
            if(dissmised){
                  translateX.value=withTiming(-windowWidth)
                  itemHeight.value=withTiming(0)
                runOnJS(onDismiss)(item.manga_id)
            }else{
                translateX.value = withTiming(0)
            }
        }
    })
    const rContainerStyle = useAnimatedStyle(() => {
        return {
          height: itemHeight.value,
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
  return (
    <Animated.View style={[styles.container,rContainerStyle]}>
        <Animated.View style={[styles.delete_container,rIconContainerStyle]}>
            <IconButton icon="delete-outline" color={light_primary_color} size={40} style={{
                // height:"100%",
                alignItems:"center",
                justifyContent:"center"
            }}/>
        </Animated.View>
        <PanGestureHandler simultaneousHandlers={simultHandler} enabled={route.name=="Favorites"&&true} onGestureEvent={panGesture}>
            <Animated.View style={[styles.task,rStyle]}>
                <MangaCard 
                    item={item}
                    favs={favs}
                    route={route}
                    navigation={navigation}
                />
            </Animated.View>
        </PanGestureHandler>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
    container:{
        width:"100%",
        marginVertical:10,
        alignItems:"center",
    },
    delete_container:{
        position:"absolute",
        height:"90%",
        right:"5%",
        width:"15%",
        justifyContent:"center",
        alignItems:"center",
    },
    task:{
        backgroundColor:"black",
        width:"100%",
        height:"100%",
        justifyContent:"center",
        alignItems:"center",
    },
    image:{
        width:115,
        height:170,
        borderTopLeftRadius:10,
        borderBottomLeftRadius:10,
    },
  })
