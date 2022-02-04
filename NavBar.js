import React, { useRef } from 'react'
import { useState } from 'react';
import { StyleSheet,Dimensions, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { light_primary_color, primary_color } from './src/components/variables';

const windowWidth = Dimensions.get('window').width;



export default function NavBar({chapters,setChap,setIndex,idx}) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(chapters[idx].chap_title);
    const [items, setItems] = useState(chapters)
    const itemSelected = (item)=>{
      setValue(item.chap_title)
      const index = chapters.indexOf(item)
      setChap(item)
      setIndex(index)
    }

    return (
      <View  style={{height:"100%"}}>
        {/* {console.log(items[idx])} */}
          <DropDownPicker
            open={open}
            value={value}
            schema={{
              label:"chap_title",
              selectable:true,
              value:"chap_title",
            }}
            placeholderStyle={{color:"#BB86FC"}}
            labelStyle={{color:"#BB86FC",fontWeight:"bold"}}
            style={styles.dropDown}
            items={items}
            listMode='FLATLIST'
            theme={"DARK"}
            onSelectItem={item=>{itemSelected(item)}}
            setOpen={setOpen}
            listItemContainerStyle={{backgroundColor:"#211B3A"}}
            selectedItemContainerStyle={{
              backgroundColor:"#2e235c",
            }}
            placeholder={value}
            setItems={setItems}
            itemKey={"chapter_num"}
          />
        </View>
    )
}
const styles = StyleSheet.create({
    dropDown: {
      borderColor:"#BB86FC",
      height:"100%",
      borderRadius:0,
      borderWidth:2,
      maxWidth:windowWidth,
      backgroundColor:"#211B3A",
    }
  })
