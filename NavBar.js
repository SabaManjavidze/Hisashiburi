import React from 'react'
import { useState } from 'react';
import { StyleSheet,Dimensions } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const windowWidth = Dimensions.get('window').width;



export default function NavBar({chapters,setChap,setIndex}) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState();
    const [items, setItems] = useState(chapters)
    const itemSelected = (item)=>{
      const index = chapters.indexOf(item)
      setChap(item)
      setIndex(index)
    }


    return (
      <>
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
            style={{borderColor:"#BB86FC",borderRadius:0,borderWidth:2,maxWidth:windowWidth,backgroundColor:"#211B3A"}}
            items={items}
            autoScroll={true}
            theme={"DARK"}
            onSelectItem={item=>{itemSelected(item)}}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            itemKey={"chapter_num"}
          />
        </>
    )
}
const styles = StyleSheet.create({
    container: {
      backgroundColor: '#121212',
      width:'100%'
    },
  })
