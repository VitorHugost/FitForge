import { Button } from "@components/Button";
import { HeaderScreen } from "@components/HeaderScreen";
import { Input } from "@components/Input";
import { UserPhoto } from "@components/UserPhoto";
import { Center, ScrollView, VStack, Skeleton, Text, Heading, useToast } from "native-base";
import { useState } from "react";
import { TouchableOpacity, Alert } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import { useForm, Controller } from 'react-hook-form'

export function Profile() {

    const Toast = useToast()
    const { control, handleSubmit } = useForm()
    const [photoIsLoading, setPhotoIsLoading] = useState(false)

    const [userPhoto, setUserphoto] = useState("https://github.com/VitorHugost.png")
    const PHOTO_SIZE = 33

    type FileProps = FileSystem.FileInfo & {
        size?: number
    }

    async function handleUserPhoto() {
        setPhotoIsLoading(true)
        try {
            const photoSelected = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 1,
                aspect: [4, 4],
                allowsEditing: true,
                // base64:true
            })

            if (photoSelected.canceled) {
                return
            }
            if (photoSelected.assets[0].uri) {
                const photoInfo: FileProps = await FileSystem.getInfoAsync(photoSelected.assets[0].uri)

                if (photoInfo.size && (photoInfo.size / 1024 / 1024) > 5) {
                    return Toast.show({
                        title: "Imagem é muito grande, superior a 5MB.",
                        placement: 'top',
                        bgColor: 'red.500'
                    })
                }

                setUserphoto(photoSelected.assets[0].uri)
            }


        } catch (error) {
            console.log(error)
        } finally {
            setPhotoIsLoading(false)
        }
        
    }

    
    function handleSignUp(data:any){
        console.log("data",data)
    }
    return (
        <VStack flex={1}>
            <HeaderScreen title="Perfil" />
            <ScrollView contentContainerStyle={{ paddingBottom: 36 }} >
                <Center px={8} mt={6} >
                    {photoIsLoading ?
                        <Skeleton w={PHOTO_SIZE} h={PHOTO_SIZE} rounded="full" startColor="gray.500" endColor="gray.400" /> :
                        <UserPhoto
                            size={33}
                            source={{ uri: userPhoto }}
                            alt="Image User" />
                    }
                    <TouchableOpacity onPress={handleUserPhoto}>
                        <Text color="green.500" fontWeight="bold" fontSize="md" mt={2} mb={8}>
                            Alterar Foto
                        </Text>
                    </TouchableOpacity>

                    <Input placeholder="Nome"
                        bg="gray.600" />
                    <Input
                        placeholder="Email"
                        bg="gray.600"
                        isDisabled _disabled={{ backgroundColor: "gray.500" }} />

                    <Heading color="gray.100" fontSize={16} mb={2} mt={12} alignSelf="flex-start" fontFamily='heading' >
                        Alterar senha
                    </Heading>

                    <Controller
                        name="old_password"
                        control={control}
                        render={({field:{onChange,value}}) => (
                            <Input placeholder="Senha antiga" bg="gray.600" onChangeText={onChange} value={value} />
                        )}
                    />
                    <Controller
                        name="new_password"
                        control={control}
                        render={({field:{onChange,value}}) => (
                            <Input placeholder="Nova senha" bg="gray.600" onChangeText={onChange} value={value} />
                        )}
                    />
                    <Controller
                        name="confirm_password"
                        control={control}
                        render={({field:{onChange,value}}) => (
                            <Input placeholder="Confirme a nova senha" bg="gray.600" onChangeText={onChange} value={value} />
                        )}
                    />
                    
                    <Button title="Atualizar" mt={4} onPress={handleSubmit(handleSignUp)} />
                </Center>


            </ScrollView>
        </VStack>
    )

}