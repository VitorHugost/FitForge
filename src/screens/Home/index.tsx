import { ExerciseCard } from "@components/ExerciseCard";
import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { Loading } from "@components/Loading";
import { ExerciseDTO } from "@dtos/ExercisesDTO";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AppNavigationRoutesProps } from "@routes/app.routes";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { FlatList, HStack, Heading, Text, VStack, useToast } from "native-base";
import { useCallback, useEffect, useState } from "react";

export function Home() {


    const toast = useToast()
    const navigation = useNavigation<AppNavigationRoutesProps>()
    
    const [isLoading, setIsLoading] = useState(true)
    const [group, setGroup] = useState<string[]>([])
    const [groupSelected, setGroupSelected] = useState('costas')
    const [exercises, setExercises] = useState<ExerciseDTO[]>([])


    function handleDetailExercise(exerciseId:string) {
        navigation.navigate('trainingDetail',{exerciseId})
    }

    async function fetchGroups() {

        try {
            setIsLoading(true)
            const res = await api.get('/groups')
            setGroup(res.data)

        } catch (error) {
            const isAppError = error instanceof AppError
            const title = isAppError ? error.message : 'Não foi possivel carregar os groups.'

            toast.show({
                title,
                placement: 'top',
                bgColor: "red.500"
            })
        } finally {
            setIsLoading(false)
        }
    }

    async function fetchExercicesByGroup() {
        try {
            setIsLoading(true)
            const res = await api.get(`/exercises/bygroup/${groupSelected}`);
            setExercises(res.data)

        } catch (error) {

            const isAppError = error instanceof AppError
            const title = isAppError ? error.message : 'Não foi possivel carregar os exercicios.'

            toast.show({
                title,
                placement: "top",
                bgColor: "red.500"
            })
        } finally {
            setIsLoading(false)
        }
    }


    useEffect(() => {
        fetchGroups()
    }, [])

    useFocusEffect(useCallback(() => {
        fetchExercicesByGroup()
    }, [groupSelected]))
    
    return (
        <VStack flex={1} >
            <HomeHeader />

            <FlatList
                my={6}
                maxH={10}
                minH={10}
                horizontal
                data={group}
                keyExtractor={item => item}
                _contentContainerStyle={{ px: 4 }}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <Group
                        name={item}
                        isActive={groupSelected.toLocaleUpperCase() == item.toLocaleUpperCase()}
                        onPress={() => setGroupSelected(item)} />
                )}
            />

            {isLoading ? <Loading /> :
                <VStack flex={1} px={6}>
                    <HStack flex={1} justifyContent='space-between' mb={5} maxHeight={7}  >
                        <Heading color='gray.200' fontSize='md' fontFamily='heading'>
                            Exercícios
                        </Heading>
                        <Text color='gray.200' fontSize='sm' >{exercises.length}</Text>
                    </HStack>

                    <FlatList
                        data={exercises}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <ExerciseCard data={item} onPress={()=>handleDetailExercise(item.id)} />
                        )}
                        showsVerticalScrollIndicator={false}
                        _contentContainerStyle={{ paddingBottom: 20 }}
                    />

                </VStack>
            }

        </VStack>
    )
}