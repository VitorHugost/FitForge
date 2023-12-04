import { ExerciseCard } from "@components/ExerciseCard";
import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { FlatList, HStack, Heading, Text, VStack } from "native-base";
import { useState } from "react";

export function Home() {

    const [group, setGroup] = useState(['Costas', 'Bíceps', 'Tríceps', 'ombro'])
    const [exercises, setExercises] = useState(['Puxada frontal', 'Remada curvada', 'Remada unilateral', 'Levantamento terra'])
    const [groupSelected, setGroupSelected] = useState('Costas')
    return (
        <VStack flex={1} >
            <HomeHeader />

            <FlatList
                my={6}
                maxH={10}
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

            <VStack flex={1} px={6}>
                <HStack flex={1} justifyContent='space-between' mb={5} maxHeight={7}  >
                    <Heading color='gray.200' fontSize='md'>
                        Exercícios
                    </Heading>
                    <Text color='gray.200' fontSize='sm' >{exercises.length}</Text>
                </HStack>

                <FlatList
                    data={exercises}
                    keyExtractor={item => item}
                    renderItem={({ item }) => (
                        <ExerciseCard name={item} description="3 sérias x 12 repetições" />
                    )}
                    showsVerticalScrollIndicator={false}
                    _contentContainerStyle={{ paddingBottom: 20 }}
                />

            </VStack>

        </VStack>
    )
}