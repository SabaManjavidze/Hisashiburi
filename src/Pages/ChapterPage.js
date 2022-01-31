import React,{useRef,useEffect,useState,useContext} from 'react';
import { StyleSheet,View,Image, ScrollView,SafeAreaView, Text,FlatList, Dimensions,TouchableOpacity,} from 'react-native';
import FitImage from 'react-native-fit-image';
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

  // const fakeChaps= [
  //     {
  //       src: "https://cm.blazefast.co/89/e9/89e9b45238f3fb4c158cc7f865def99f.jpg"
  //     }
  // ]

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

    const renderItem = ({item,index})=>{
        return(
          <FitImage source={{uri:item.src}}/>
        )
    }
    return (
            <View 
              style={{width:"100%",height:"100%"}}
            >
            {loaded&&(
                <View
                  style={{width:"100%",height:"100%"}}
                >
                <View style={{flexDirection:"column", height:windowHeight*0.2}}>
                  <ChapterNav 
                    setChapter={setChapter} 
                    setIndex={setIndex} 
                    idx={idx}
                    navigation={navigation}
                    chapters={chapters}
                  />
                  <View>
                    <NavBar chapters={chapters} setIndex={setIndex} scroll_ref={scroll_ref.current} setChap={setChapter} />
                  </View>
                </View>

                <ScrollView style={{height:"100%",width:"100%"}} contentContainerStyle={{alignItems:"center"}}>
                  {/* <FlatList
                    data={data}
                    scrollEnabled={false}
                    nestedScrollEnabled
                    ref={scroll_ref}
                    renderItem={renderItem}
                    keyExtractor={item=>item.src}
                    style={{width:"100%",height:"100%"}}
                  /> */}
                  <View style={{width:windowWidth}}>
                  {
                    data.map(child=>{
                      return(
                        <FitImage source={{uri:child.src}} />
                        )
                      })
                    }
                    </View>
                <View style={{ height:windowHeight*0.2,width:"100%",backgroundColor:main_color,justifyContent:"center"}}>

                  <ChapterNav 
                    setChapter={setChapter} 
                    setIndex={setIndex} 
                    idx={idx}
                    navigation={navigation}
                    chapters={chapters}
                    />
                </View>
                </ScrollView>

                  {/* {
                    data.map(child=>{
                      return(
                        <FitImage key={child.src} source={{uri:child.src}} />
                      )
                    })
                  } */}
                </View>
            )}
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
