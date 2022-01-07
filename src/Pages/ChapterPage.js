import React,{useRef,useEffect,useState,useContext} from 'react';
import { StyleSheet,View,Image, ScrollView,SafeAreaView, Text,FlatList, Dimensions,} from 'react-native';
import NavBar from '../../NavBar';
import { main_url } from '../components/variables';

const windowWidth = Dimensions.get('window').width;

export default function ChapterPage({navigation,route}) {
  const {manga_id,chapters,index} = route.params
  const [data, setData] = useState([]);
  const [chapter, setChapter] = useState(chapters[index])
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
      if(loaded)
      {
        scroll_ref.current.scrollToOffset({animated:true,offset:0})
      }
    }
  }, [chapter]);


    const renderItem = ({item,index})=>{
        return(
          <Image key={index} source={{uri:item.src}} style={styles.image}/>
        )
    }
    return (
        <View style={styles.container}>
          
            {loaded&&(
              <>
              <NavBar chapters={chapters} scroll_ref={scroll_ref.current} setChap={setChapter} />
              <FlatList
                data={data}
                ref={scroll_ref}
                renderItem={renderItem}
                keyExtractor={item=>item.src}
                style={{height:"100%"}}
              />
              </>
            )}
        </View>

  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#282A36',
    width:'100%',
    alignItems:'center'
  },
  scrollView: {
    flex:2,
    flexDirection:'column',
    alignItems:'center',
    width:"100%"
  },
  scrollViewParent:{
    flex:2,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  image:{
    width:windowWidth,
    height:740,
    resizeMode:"contain",
  },
  navigation:{
    flex:2,
    height:200,
    justifyContent:"space-around",
    flexDirection:"row",
    alignItems:"center",
    backgroundColor:"#121212"
  },
  prev_btn:{
    height:60,
    backgroundColor:'red',
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:15,
  },
  nex_btn:{
    height:60,
    backgroundColor:'purple',
    flex:1,
    borderRadius:15,
    justifyContent:'center',
    alignItems:'center'
  },
  input:{
    backgroundColor:'rgb(68,65,65)',
    borderRadius:10,
    width:120,
    height:45,
    color:'white'}
})
