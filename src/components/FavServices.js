import { AsyncStorage } from "react-native"

export const addToFavorites = async (value,manga_id)=>{
    if(value===null){
        const parsed = [manga_id]
        await AsyncStorage.setItem("FavoriteManga",JSON.stringify(parsed))
    }else{
        const parsed = JSON.parse(value)
        parsed.push(manga_id)
        await AsyncStorage.setItem("FavoriteManga",JSON.stringify(parsed))
    }
}
export const checkIfFavorited= async(value,manga_id)=>{
    if (value !== null) {
      const parsed = JSON.parse(value)
      const found = parsed.find(child=>child==manga_id)
      const isfav = (found!==null&&found)
      return isfav
    }
}
export const removeFromFavorites = async (value,manga_id)=>{
    if(value!==null){
        const parsed = JSON.parse(value) 
        const modded = parsed.filter(child=>child!=manga_id)
        console.log(JSON.stringify(modded))
        if(modded.length==0){
            await AsyncStorage.removeItem("FavoriteManga")
        }
        else{
            await AsyncStorage.setItem("FavoriteManga",JSON.stringify(modded))
        }
    }
}