import LogoSvg from '@assets/logo.svg'
import { Input } from '@components/Input'
import { Button } from '@components/Button'
import BackgroundImage from '@assets/background.png'
import { useNavigation } from '@react-navigation/native'
import { Center, Image, Text, VStack, Heading, ScrollView } from 'native-base'
import { useForm, Controller } from 'react-hook-form'

import { yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'

type FormDataProps = {
    name: string,
    email: string,
    password: string,
    confirm_password: string
}

const schema = yup.object({
    name: yup.string().required("Informe o nome."),
    email:yup.string().required("informa o e-email.").email("E-mail inválido."),
    password: yup.string().required("informa a senha.").min(8,"Minimo de 6 caracteres."),
    confirm_password: yup.string().required("confirme a senha").oneOf([yup.ref('password')], 'As senhas devem ser iguais')
})

export function SignUp() {

    const navigation = useNavigation()
    const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
        resolver:yupResolver(schema)
    })

    function handleGoBack() {
        navigation.goBack()
    }

    function handleSignUp(data: any) {
        console.log("data", data)
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

                    <Button title='Criar e acessar' onPress={handleSubmit(handleSignUp)} />
                </Center>

                <Button title='Voltar para o login' variant='outline' mt={12} onPress={handleGoBack} />

            </VStack>
        </ScrollView>
    )
}