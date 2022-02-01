import React,{useRef,useEffect,useState,useContext} from 'react';
import { StyleSheet,View,Image, ScrollView,SafeAreaView, Text,FlatList, Dimensions,TouchableOpacity, AsyncStorage,} from 'react-native';
import { ActivityIndicator, Button, IconButton } from 'react-native-paper';
import MangaCard from '../components/MangaCard';
import {PanGestureHandler} from "react-native-gesture-handler"
import Animated,{useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';
import { domain, main_color, main_url, primary_color } from '../components/variables';
import { fetchData } from './MangaDetails';

export default function Favorites({navigation,route}) {
    const [data, setData] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [favs, setFavs] = useState();
    const [isEmpty, setIsEmpty] = useState(false);
    const formatObj = async (child)=>{

        const json = await fetchData(child)
        const chapters = []
        json.chapters.map((child,i)=>{
            const length = json.chapters.length<3?json.chapters.length:3
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
      
    const renderItem = (child)=>(
        <MangaCard item={child.item} setdata={setData} data={data} favs={favs} route={route} navigation={navigation}/>
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
                <View style={{flex:1}}>
                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        style={{height:"100%",width:"100%"}}
                        keyExtractor={item=>item.manga_id}
                    />
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
    task:{
        backgroundColor:"black",
        marginBottom:100,
        width:"100%",
        justifyContent:"center",
        alignItems:"center",
        borderWidth:2,
        borderColor:"white"
    }
})