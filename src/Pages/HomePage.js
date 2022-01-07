import React, { useEffect, useState} from 'react'
import { StatusBar } from 'expo-status-bar';
import { View, Text, FlatList, Image, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native'
import { main_url,domain, img_url } from '../components/variables'
import { Toolbar} from 'react-native-material-ui';
import MangaCard from '../components/MangaCard';


export default function HomePage({navigation}) {

    const [data, setData] = useState([])
    const [loaded, setLoaded] = useState(false)
    const [input, setInput] = useState("")

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
    return (
        <SafeAreaView style={{alignItems:'center',flex:1,backgroundColor: '#282A36',marginTop:30}}>
            <StatusBar 
                animated={true}
                backgroundColor="#282A36"
                hidden={false}
                style={'light'}
            />
            <Toolbar
            leftElement="menu"
            centerElement="HomePage"
            searchable={{
              autoFocus: true,
              placeholder: 'Search',
              onChangeText:(inp)=>setInput(inp),
              onSearchClosed:()=>setInput("")
            }}
            style={{
                container:{backgroundColor:'#282A36'},
            }}
            />
            {
                loaded?(
                    <FlatList
                        data={data}
                        renderItem={(child)=>{return(<MangaCard key={child.manga_id} navigation={navigation} item={child.item} />)}}
                        keyExtractor={item=>item.manga_id}
                        style={{height:"100%"}}
                    />
                )
                :
                (
                    <View style={{width:"100%",height:"100%",backgroundColor:"#282A36"}}></View>
                )
            }
        </SafeAreaView>
    )
}
