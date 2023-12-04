import { HStack, Heading, Icon, Image, Text, VStack, useTheme } from "native-base";
import { MaterialIcons } from '@expo/vector-icons'
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

type Props = TouchableOpacityProps & {
    name: string;
    description: string
}

export function ExerciseCard({ name, description, ...rest }: Props) {
    const { colors, sizes } = useTheme()
    return (
        <TouchableOpacity {...rest}>

            <HStack
                bg="gray.500"
                p={2}
                pr={4}
                rounded='md'
                alignItems='center'
                mb={3}
            >

                    <Image
                        source={{ uri: 'https://www.feitodeiridium.com.br/wp-content/uploads/2016/07/remada-unilateral-2.jpg' }}
                        alt="Traning Image"
                        w={16}
                        h={16}
                        mr={4}
                        rounded='md'
                    />

                    <VStack flex={1} >
                        <Heading color="white"  fontSize="md">{name}</Heading>

                        <Text color="gray.200" fontSize='sm' numberOfLines={2} >{description}</Text>

                    </VStack>

                    <Icon
                        as={MaterialIcons}
                        name='arrow-forward-ios'
                        width={7}
                        height={7}
                        color="gray.300" />
                </HStack>

        </TouchableOpacity>

    )
}