import React,{useRef,useEffect,useState,useContext} from 'react';
import { StyleSheet,View,Image, ScrollView,SafeAreaView, Text,FlatList, Dimensions,TouchableOpacity,} from 'react-native';
import FitImage from 'react-native-fit-image';
import { ActivityIndicator } from 'react-native-paper';
import NavBar from '../../NavBar';
import ChapterNav from '../components/ChapterNav';
import { main_color, main_url, primary_color } from '../components/variables';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default function ChapterPage({navigation,route}) {
  const {manga_id,chapters,index} = route.params
  const [data, setData] = useState([]);
  const [chapter, setChapter] = useState(chapters[index])
  const [idx, setIndex] = useState(index);
  const [loaded, setLoaded] = useState(false);
  const scroll_ref = useRef(null)

  const fetchData = async ()=>{
    const url = `${main_url}/manga/${manga_id}/${chapter.chapter_num}`
    const data= await fetch(url)
    const json = await data.json()
    setData(json)
    setLoaded(true)
  }
  
  useEffect(() => {
    if(chapter!=null){
      fetchData()
      navigation.setOptions({title:chapter.chap_title})

      if(loaded&&scroll_ref!=null&&scroll_ref.current!=null)
      {
        scroll_ref.current.scrollToOffset({animated:true,offset:0})
      }
    }
  }, [chapter]);
  const renderItem=({item})=>(
    <FitImage key={item.src} source={{uri:item.src}} />
  )
    return (
            <View 
              style={{width:"100%",height:"100%"}}
            >
            {loaded?(
                <View
                  style={{width:"100%",height:"100%"}}
                >
                <View style={{flexDirection:"column", height:windowHeight*0.06}}>
{loaded&&                    <NavBar 
                      chapters={chapters} 
                      setIndex={setIndex} 
                      scroll_ref={scroll_ref.current} 
                      setChap={setChapter} 
                      idx={idx}
                    />}
                </View>

                <View style={{width:"100%",height:"100%",flexDirection:"column"}}>
                {/* <ScrollView nestedScrollEnabled style={{width:"100%"}}> */}
                  <FlatList
                    data={data}
                    ref={scroll_ref}
                    renderItem={renderItem}
                    keyExtractor={item=>item.src}
                    style={{width:"100%"}}
                    />
                  <View style={{height:"15%",backgroundColor:main_color}}>
                    <ChapterNav
                      setChapter={setChapter} 
                      setIndex={setIndex} 
                      idx={idx}
                      navigation={navigation}
                      chapters={chapters}
                      />
                  </View>
                  </View>
                  {/* 
                  {
                    data.map(child=>{
                      return(
                        <FitImage key={child.src} source={{uri:child.src}} />
                        )
                      })
                    }
                     */}
                {/* </ScrollView> */}
                </View>
            )
          :
          (
            <ActivityIndicator animating={true} color={primary_color} />
          )
          }
            </View>

  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#15101f',
    width:'100%',
    height:"100%",
    alignItems:'center',
    justifyContent:'center',
    flex:1,
    flexDirection:"column"
  }
})
