import { UserDTO } from "@dtos/UserDTO";
import { api } from "@services/api";
import { storageGetUser, storageUserRemove, storageUserSave } from "@storage/storageUser";
import { ReactNode, createContext, useEffect, useState } from "react";

export type AuthContextDataProps = {
    user: UserDTO
    signIn: (email: string, password: string) => Promise<void>
    signOut:()=> Promise<void>
    isLoadingUserData: boolean

}
type AuthContextProviderProps = {
    children: ReactNode
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
    const [user, setUser] = useState<UserDTO>({} as UserDTO)
    const [isLoadingUserData, setLoadingUserData] = useState(true)

    async function signIn(email: string, password: string) {
        try {
            const { data } = await api.post("/sessions", { email, password })
            console.log("data",data)

            if (data.user && data.token) {
                setUser(data.user)
                storageUserSave(data.user)
            }

        } catch (error) {
            throw error
        }

    }

    async function signOut(){
        try{
            setLoadingUserData(true)
            setUser({} as UserDTO)
            await storageUserRemove()
        } catch(error) {
            throw error
        } finally{
            setLoadingUserData(false)
        }
    }


    async function loadUserData() {

        try {

            const userLogged = await storageGetUser()

            if (userLogged) {
                setUser(userLogged)
                setLoadingUserData(false)
            }
        } catch (error) {
            throw error
        } finally {
            setLoadingUserData(false)
        }
    }

    useEffect(() => {
        loadUserData()
    }, [])


    return (

        <AuthContext.Provider value={{ user, signIn, signOut ,isLoadingUserData }} >
            {children}
        </AuthContext.Provider>
    )

}