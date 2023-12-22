import { handleError } from "@utils/AppError";
import { api } from "./api";
import { useToast } from "native-base";

export async function fetchGroups(){
    const toast = useToast()

    try{
        const res = await api.get('/groups')   
        console.log("res",res)
    } catch (error){
       const msg =  handleError(error)
       toast.show({
        title:msg,
        placement: 'top',
        bgColor: "red.500"
    })
    }
}