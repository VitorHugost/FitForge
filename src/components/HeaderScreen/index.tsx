import { Center, Heading, VStack } from "native-base";

type Props ={
    title:string
}

export function HeaderScreen({title}:Props){
    return(
        <Center bg="gray.600" pb={6} pt={16}>
            <Heading color="gray.100" fontSize="xl"  >
                {title}
            </Heading>
        </Center>
    )
}