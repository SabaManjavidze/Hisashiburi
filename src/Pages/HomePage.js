import React, { useEffect, useRef, useState} from 'react'
import { StatusBar } from 'expo-status-bar';
import { View, Text, FlatList, Image, TouchableOpacity, Dimensions, SafeAreaView, Animated } from 'react-native'
import { main_url,domain, img_url, main_color, primary_color, secondary_color } from '../components/variables'
import { Appbar,IconButton,Searchbar } from 'react-native-paper';
import MangaCard from '../components/MangaCard';
const AnimatedIcon = Animated.createAnimatedComponent(IconButton);

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function HomePage({ navigation }) {

    const [data, setData] = useState([])
    const [loaded, setLoaded] = useState(false)
    const [input, setInput] = useState("")
    const [showInput, setShowInput] = useState(false)
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const inputRef = useRef(null)
    const fetchData = async ()=>{
        const url = `${main_url}/homepage`
        const res = await fetch(url)
        const json = await res.json()
        setData(json)
        setLoaded(true)
    }
    const fetchResults = async () =>{
        setLoaded(false)
        setData([])
        const data = await fetch(`${main_url}/search/${input}`)
        const json = await data.json()
        setData(json)
        setLoaded(true)
    }
    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        if(input==null||input==""){
            fetchData()
        }else{
            fetchResults()
        }
    }, [input])
    
    const renderItem = (child)=>(
        <MangaCard key={child.manga_id} navigation={navigation} item={child.item} />
    )
    const backArrow = () =>(
        <Appbar.Action 
        style={{
            backgroundColor:secondary_color,
            rotation:-90,
            color:"white",
            borderRadius:0
        }} 
        color="white"
        icon={"navigation"}
        onPress={()=>{
        setShowInput(false)
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration:500,
            useNativeDriver:false
        }).start();
        }} 
    />
    )
    return (
        <SafeAreaView style={{alignItems:'center',flex:1,backgroundColor: main_color}}>
            <StatusBar 
                animated={true}
                backgroundColor="#282A41"
                hidden={false}
                style={'light'}
            />
            <Appbar.Header style={{width:"100%",backgroundColor:main_color,alignItems:'center'}}>
                {showInput||<Appbar.Content title="Sashiburi" />}
                    <Appbar.Action icon="magnify" style={{display:showInput?"none":"flex",marginRight:20}} onPress={()=>{
                        setShowInput(true)
                        inputRef.current.focus()
                        Animated.spring(fadeAnim, {
                            toValue: width*0.95,
                            useNativeDriver:false
                        }).start();
                        }} 
                    />
               <Animated.View style={{width:fadeAnim,flexDirection:"row"}}>

                    <Searchbar 
                         placeholder='Search Manga'
                         placeholderTextColor={"white"}
                         onChangeText={(input)=>{setInput(input)}}
                         ref={inputRef}
                         inputStyle={{color:"white"}}
                         style={{
                            backgroundColor:secondary_color,
                            color:"white",
                            shadowOpacity:0,
                            flex:1
                            }}
                         icon={backArrow}
                    />
                </Animated.View>
            </Appbar.Header>
            {
                loaded?(
                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={item=>item.manga_id}
                        style={{height:"100%"}}
                    />
                )
                :
                (
                    <View style={{width:"100%",height:"100%",backgroundColor:main_color}}></View>
                )
            }
        </SafeAreaView>
    )
}
