import BackgroundImage from '@assets/background.png'
import LogoSvg from '@assets/logo.svg'
import { Button } from '@components/Button'
import { Input } from '@components/Input'
import { useNavigation } from '@react-navigation/native'
import { Center, Heading, Image, ScrollView, Text, VStack, useToast } from 'native-base'
import { Controller, useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'
import { UseAuth } from '@hooks/useAuth'
import { api } from '@services/api'
import { AppError } from '@utils/AppError'
import { useState } from 'react'
import * as yup from 'yup'

interface FormDataProps {
    name: string,
    email: string,
    password: string,
    confirm_password: string
}

const schema = yup.object({
    name: yup.string().required("Informe o nome."),
    email: yup.string().required("informa o e-email.").email("E-mail inválido."),
    password: yup.string().required("informa a senha.").min(8, "Minimo de 6 caracteres."),
    confirm_password: yup.string().required("confirme a senha").oneOf([yup.ref('password')], 'As senhas devem ser iguais')
})

export function SignUp() {

    const [isLoading, setIsLoading]= useState(false)

    const toast = useToast()
    const { signIn} = UseAuth()


    const navigation = useNavigation()
    const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
        resolver: yupResolver(schema)
    })

    function handleGoBack() {
        navigation.goBack()
    }

    async function handleSignUp({ name, email, password }: FormDataProps) {

        try {
            setIsLoading(true)
            await api.post('/users', { name, email, password })
            await signIn(email, password)
            
            
        } catch (error) {
            
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : 'não ofi possivel criar a conta. tente novamente'
            
            toast.show({
                title,
                placement:'top',
                bgColor:'red.500'
            })
            
        } finally{

            setIsLoading(false)
        }
        
    }
    
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>

            <VStack flex={1} px={10} pb={16}>
                <Image
                    source={BackgroundImage}
                    defaultSource={BackgroundImage}
                    alt='Pessoas treinando'
                    position='absolute'
                    resizeMode='contain' />

                <Center my={24}>
                    <LogoSvg />
                    <Text color='gray.100' fontSize={'sm'}>Treine sua mente e o seu corpo</Text>
                </Center>
                <Center  >

                    <Heading color='gray.100' mb={'6'} fontFamily='heading'>
                        Crie sua conta
                    </Heading>

                    <Controller
                        name='name'
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder='Nome'
                                onChangeText={onChange}
                                value={value}
                                errorMessage={errors.name?.message}
                            />
                        )}
                    />

                    <Controller
                        name='email'
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Input
                                keyboardType='email-address'
                                placeholder='E-mail'
                                value={value}
                                onChangeText={onChange}
                                errorMessage={errors.email?.message}
                            />
                        )}
                    />

                    <Controller
                        name='password'
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Input
                                secureTextEntry
                                placeholder='Senha'
                                value={value}
                                onChangeText={onChange}
                                errorMessage={errors.password?.message}
                            />
                        )}
                    />

                    <Controller
                        name='confirm_password'
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Input
                                secureTextEntry
                                placeholder='Confirme a Senha'
                                value={value}
                                onChangeText={onChange}
                                onSubmitEditing={handleSubmit(handleSignUp)}
                                returnKeyType='send'
                                errorMessage={errors.confirm_password?.message}
                            />
                        )}
                    />

                    <Button title='Criar e acessar' onPress={handleSubmit(handleSignUp)} isLoading={isLoading} />
                </Center>

                <Button title='Voltar para o login' variant='outline' mt={12} onPress={handleGoBack} />

            </VStack>
        </ScrollView>
    )
}