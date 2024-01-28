import LogoSvg from '@assets/logo.svg'
import { Input } from '@components/Input'
import { Button } from '@components/Button'
import BackgroundImage from '@assets/background.png'
import { useNavigation } from '@react-navigation/native'
import { AuthNavigatorRoutesProps } from '@routes/auth.routes'
import { Center, Image, Text, VStack, Heading, ScrollView, useToast } from 'native-base'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { UseAuth } from '@hooks/useAuth'
import { AppError } from '@utils/AppError'
import { useState } from 'react'

const schema = yup.object({
    email: yup.string().email("Email invalido").required("Este campo é obrigatório"),
    password: yup.string().min(8).required("Este campo é obrigatório")
})

interface Props {
    email: string;
    password: string;
}

export function SignIn() {

    const navigation = useNavigation<AuthNavigatorRoutesProps>()
    const { signIn } = UseAuth()
    const [isLoading, setIsLoading] = useState(false)
    const toast = useToast()

    const { control, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) })

    function handleGoSignUp() {
        navigation.navigate('signUp')
    }

    async function handleSignIn({ email, password }: Props) {
        try {
            setIsLoading(true)
            await signIn(email, password)

        } catch (error) {
            const isAppError = error instanceof AppError
            const title = isAppError ? error.message : "Não foi possivel entrar. Tente novamente"
            setIsLoading(false)

            toast.show({
                title,
                placement: 'top',
                bgColor: "red.500"
            })
        }
    }

    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}> 

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
                        Acesse sua conta
                    </Heading>
                    <Controller
                        name='email'
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Input
                                keyboardType='email-address'
                                placeholder='E-mail'
                                value={value}
                                onChangeText={onChange}
                                autoCapitalize='none'
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
                                onChangeText={onChange}
                                placeholder='Senha'
                                value={value}
                                errorMessage={errors.password?.message}
                            />
                        )}
                    />



                    <Button title='Acessar' isLoading={isLoading} onPress={handleSubmit(handleSignIn)} />
                </Center>

                <Center mt={42} >
                    <Text color='gray.100' mb={3} fontFamily='body' fontSize='sm' >Ainda não tem acesso?</Text>
                    <Button title='Crie sua conta' variant='outline' onPress={handleGoSignUp} />
                </Center>

            </VStack>
        </ScrollView>
    )
}