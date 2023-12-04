import { HeaderScreen } from "@components/HeaderScreen";
import { HistoryCard } from "@components/HistoryCard";
import { Heading, VStack } from "native-base";
import { useState } from "react";
import { SectionList } from "react-native";

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
        <VStack flex={1}>
            <HeaderScreen  title="Histórico de Exercícios"/>

            <SectionList 
            sections={exercise}
            keyExtractor={item => item}
            renderItem={({item})=>(
                <HistoryCard />
            )}
            renderSectionHeader={({section})=>(
                <Heading color="gray.200" fontSize="md" mt={10} mb={3}>
                    {section.title}
                </Heading>
            )}
            />
        </VStack>
    )
    
}