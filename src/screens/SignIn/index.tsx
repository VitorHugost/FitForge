import LogoSvg from '@assets/logo.svg'
import { Input } from '@components/Input'
import { Button } from '@components/Button'
import BackgroundImage from '@assets/background.png'
import { useNavigation } from '@react-navigation/native'
import { AuthNavigatorRoutesProps } from '@routes/auth.routes'
import { Center, Image, Text, VStack, Heading, ScrollView } from 'native-base'
import { useForm, Controller } from 'react-hook-form'

export function SignIn() {

    const navigation = useNavigation<AuthNavigatorRoutesProps>()

    const {control,handleSubmit} = useForm()

    function handleGoSignUp() {
        navigation.navigate('signUp')
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
                    <Input
                        keyboardType='email-address'
                        placeholder='E-mail'
                        autoCapitalize='none'
                    />

                    <Input
                        secureTextEntry
                        placeholder='Senha'
                    />
                    <Button title='Acessar' />
                </Center>

                <Center mt={40} >
                    <Text color='gray.100' mb={3} fontFamily='body' fontSize='sm' >Ainda não tem acesso?</Text>
                    <Button title='Acessar' variant='outline' onPress={handleGoSignUp} />
                </Center>

            </VStack>
        </ScrollView>
    )
}