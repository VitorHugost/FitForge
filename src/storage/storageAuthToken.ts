import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_TOKEN_STORAGE } from "@storage/storageConfig";


export async function storageTokenSave(token:string){
    await AsyncStorage.setItem(USER_TOKEN_STORAGE,token)
}

export async function storageTokenGet(){
    const token = await AsyncStorage.getItem(USER_TOKEN_STORAGE)
    return token
}
export async function storageTokenRemove(){
    const token = await AsyncStorage.removeItem(USER_TOKEN_STORAGE)
    return token
}