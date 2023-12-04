import LogoSvg from '@assets/logo.svg'
import { Input } from '@components/Input'
import { Button } from '@components/Button'
import BackgroundImage from '@assets/background.png'
import { useNavigation } from '@react-navigation/native'
import { Center, Image, Text, VStack, Heading, ScrollView } from 'native-base'

export function SignUp() {

    const navigation =  useNavigation()

    function handleGoBack(){
        navigation.goBack()
    }

    return (
        <ScrollView contentContainerStyle={{flexGrow:1}} showsVerticalScrollIndicator={false}>

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

                    <Heading color='gray.100' mb={'6'}>
                        Crie sua conta
                    </Heading>
                    <Input
                        placeholder='Nome'
                    />

                    <Input
                        keyboardType='email-address'
                        placeholder='E-mail'
                    />

                    <Input
                        secureTextEntry
                        placeholder='Senha'
                    />
                    <Input
                        secureTextEntry
                        placeholder='Confirme a Senha'
                    />
                    <Button title='Criar e acessar' />
                </Center>

                    <Button title='Voltar para o login' variant='outline' mt={'24'} onPress={handleGoBack} />

            </VStack>
        </ScrollView>
    )
}