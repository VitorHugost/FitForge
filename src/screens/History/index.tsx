import { HeaderScreen } from "@components/HeaderScreen";
import { HistoryCard } from "@components/HistoryCard";
import { Center, Heading, SectionList, Text, VStack, View } from "native-base";
import { useState } from "react";
// import { SectionList } from "react-native";

export function History(){
    const [exercise, setExercise] = useState([
    {
        title:"28.06.23",
        data:["Puxada frontal","Remada unilateral"]
    },
    {
        title:"29.06.23",
        data:["Puxada frontal",]
    },

])
    return(
        <VStack flex={1} >
            <HeaderScreen  title="Histórico de Exercícios"/>

            <SectionList
            sections={exercise}
            keyExtractor={item => item}
            renderItem={({item})=>(
                <HistoryCard  />
            )}
            renderSectionHeader={({section})=>(
                <Heading flex={1} color="gray.200" fontSize="md" mt={10} mb={3} fontFamily='heading'>
                    {section.title}
                </Heading>
            )}
            px={4}
            contentContainerStyle={exercise.length ===0 && {flex:1, justifyContent:"center"}}
            ListEmptyComponent={()=>(

                <Text color="gray.100" textAlign="center" >Não há exercicios registrados ainda.</Text>
            )}
            showsVerticalScrollIndicator={false}
            />
        </VStack>
    )
}