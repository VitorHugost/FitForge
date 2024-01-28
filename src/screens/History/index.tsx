import { HeaderScreen } from "@components/HeaderScreen";
import { HistoryCard } from "@components/HistoryCard";
import { Loading } from "@components/Loading";
import { HistoryGroupByDayDTO } from "@dtos/HistoryGroupByDataDTO";
import { useFocusEffect } from "@react-navigation/native";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { Heading, SectionList, Text, VStack, useToast } from "native-base";
import { useCallback, useState } from "react";

export function History() {
  const toast = useToast();
  const [exercise, setExercise] = useState<HistoryGroupByDayDTO[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchHistory() {
    try {
      setIsLoading(true);
      const res = await api.get("/history");
      setExercise(res.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possivel encontrar dados";
      toast.show({
        title,
        placement: "top",
        color: "red.700",
      });
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchHistory();
    }, [])
  );

  if (isLoading) return <Loading />;
  return (
    <VStack flex={1}>
      <HeaderScreen title="Histórico de Exercícios" />

      {isLoading ? (
        <Loading />
      ) : (
        <SectionList
          sections={exercise}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <HistoryCard data={item} />}
          renderSectionHeader={({ section }) => (
            <Heading
              flex={1}
              color="gray.200"
              fontSize="md"
              mt={10}
              mb={3}
              fontFamily="heading"
            >
              {section.title}
            </Heading>
          )}
          px={4}
          contentContainerStyle={
            exercise.length === 0 && { flex: 1, justifyContent: "center" }
          }
          ListEmptyComponent={() => (
            <Text color="gray.100" textAlign="center">
              Não há exercicios registrados ainda.
            </Text>
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
    </VStack>
  );
}
