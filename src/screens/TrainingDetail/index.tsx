import { Box, Center, HStack, Heading, Icon, Image, ScrollView, Text, VStack, useToast } from "native-base";
import { TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useNavigation, useRoute } from "@react-navigation/native";
import { AppNavigationRoutesProps } from "@routes/app.routes";
import BodySvg from '@assets/body.svg'

import SerieSvg from '@assets/series.svg'
import RepetitionsSvg from '@assets/repetitions.svg'
import { Button } from "@components/Button";
import { useEffect, useState } from "react";
import { AppError } from "@utils/AppError";
import { api } from "@services/api";
import { ExerciseDTO } from "@dtos/ExercisesDTO";
import { Loading } from "@components/Loading";

type RouteParamsProps = {
    exerciseId: string
}

export function TrainingDetail() {

    const navigation = useNavigation<AppNavigationRoutesProps>()
    const [isLoading, setIsLoading] = useState(true)
    const [dataExercise, setDataExercise] = useState<ExerciseDTO>()

    const param = useRoute<any>()
    const toast = useToast()

    const { exerciseId } = param.params as RouteParamsProps

    function handleGoBack() {
        navigation.navigate("home")
    }

    async function fetchGroupsById() {
        try {

            setIsLoading(true)
            const res = await api.get(`/exercises/${exerciseId}`)
            setDataExercise(res.data)

        } catch (error) {

            const isAppError = error instanceof AppError
            const title = isAppError ? error.message : 'Não foi possivel carregar os detalhes do groups.'

            toast.show({
                title,
                placement: 'top',
                bgColor: "red.500"
            })

        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchGroupsById()
    }, [exerciseId])

    if (isLoading) return <Loading />

    return (
        <VStack flex={1}>

            <VStack px={8} bg='gray.600' pt={12}  >

                <TouchableOpacity onPress={handleGoBack} >
                    <Icon as={Feather} name='arrow-left' color='green.500' size={6} />
                </TouchableOpacity>

                <HStack justifyContent='space-between' mt={4} mb={8} alignItems="center">

                    <Heading color="gray.100" fontSize="lg" flexShrink={1} fontFamily='heading'>
                        {dataExercise?.name}
                    </Heading>

                    <HStack alignItems="center">

                        <BodySvg />
                        <Text color="gray.200" ml={1} textTransform="capitalize">
                            {dataExercise?.group}
                        </Text>
                    </HStack>

                </HStack>

            </VStack>

            <ScrollView>

                <VStack p={8} >
                    <Box mb={3} rounded='md' overflow='hidden'  >

                        <Image
                            source={{ uri: `${api.defaults.baseURL}/exercise/demo/${dataExercise?.demo}` }}
                            w="full"
                            h={80}
                            resizeMode="cover"
                            alt="Exercise Image"
                        />
                    </Box>

                    <Box bg="gray.600" rounded="md" pb={4} px={4}>
                        <HStack justifyContent="space-around" mb={6} mt={5} alignItems="center">
                            <HStack>
                                <SerieSvg />
                                <Text color="gray.200" ml={2}>{dataExercise?.series} séries</Text>
                            </HStack>
                            <HStack>
                                <RepetitionsSvg />
                                <Text color="gray.200" ml={2}>{dataExercise?.repetitions} repetições</Text>
                            </HStack>
                        </HStack>
                        <Button title="Marcar como realizado" />
                    </Box>
                </VStack>

            </ScrollView>
        </VStack>
    )

}