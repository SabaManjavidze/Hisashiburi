import React,{useRef,useEffect,useState,useContext, useCallback} from 'react';
import { StyleSheet,View,Image,SafeAreaView, Text, Dimensions,TouchableOpacity, AsyncStorage,} from 'react-native';
import { ActivityIndicator, Button, IconButton } from 'react-native-paper';
import MangaCard from '../components/MangaCard';
import {PanGestureHandler} from "react-native-gesture-handler"
import Animated,{useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';
import { domain, main_color, main_url, primary_color } from '../components/variables';
import { fetchData } from './MangaDetails';
import { FlatList,ScrollView } from 'react-native-gesture-handler';
import { removeFromFavorites } from '../components/FavServices';
import FavCard from '../components/FavCard';

export default function Favorites({navigation,route}) {
    const [data, setData] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [favs, setFavs] = useState();
    const [isEmpty, setIsEmpty] = useState(false);
    const listRef = useRef(null)
    const formatObj = async (child)=>{

        const json = await fetchData(child)
        const chapters = []
        const length = json.chapters.length<3?json.chapters.length:3
        json.chapters.map((child,i)=>{
            if(i<length){
                chapters.push(child)
              }
          }) 
          json.details.img_url=domain+json.details.img_url
          const obj = {
              ...json.details,
          }
          obj["chapters"]=chapters
          return obj
    }
        const getData = async () => {
            const value = await AsyncStorage.getItem('FavoriteManga');
            if(!value){
                setIsEmpty(true)
                setLoaded(true)
                return;
            }
            setFavs(value)
            const parsed = JSON.parse(value)
            const manga_data = []
            for(let i =0;i<parsed.length;i++)
            {
                const obj = await formatObj(parsed[i])
                manga_data.push(obj)
            }
            // console.log(JSON.stringify(data)),
            setData(manga_data)
            setLoaded(true)
      };
    //   useEffect(() => {
    //   }, [favs]);
    const onDismiss=useCallback((manga_id)=>{
        const new_data = data.filter(child=>child.manga_id!=manga_id)
        setData(new_data)
        removeFromFavorites(favs,manga_id)
    })

    const renderItem = (child)=>(
        <FavCard 
            item={child.item}  
            onDismiss={onDismiss} 
            favs={favs} 
            route={route} 
            navigation={navigation}
            simultHandler={listRef}
        />
    )
    useEffect(() => {
        getData()
    }, []);
    return(
    <SafeAreaView style={{backgroundColor:main_color,flex:1}}>
        {
            loaded?(
                isEmpty?
                <View style={{width:"100%",justifyContent:"center",alignItems:"center",height:"90%"}}>
                    <Text style={{color:"white",fontSize:30,textAlign:"center"}}>No Favorites Added</Text>
                </View>
                :
                <View style={{alignItems:"center"}}>
                    {/* <FlatList
                        data={data}
                        renderItem={renderItem}
                        style={{height:"100%",width:"100%"}}
                        keyExtractor={item=>item.manga_id}
                        scrollToOverflowEnabled
                        bounces={2}
                    /> */}
                    <ScrollView ref={listRef}>
                    {
                       loaded&& data.map(child=>{
                            return(
                                <FavCard 
                                    item={child}  
                                    onDismiss={onDismiss} 
                                    favs={favs} 
                                    key={child.manga_id}
                                    route={route} 
                                    navigation={navigation}
                                    simultHandler={listRef}
                                />
                            )
                        })
                    }
                    </ScrollView>

                    </View>
                    )
            :
            (
                <ActivityIndicator animating={true} color={primary_color} />
            )

        }
    </SafeAreaView>
    )
}
const styles=StyleSheet.create({

})