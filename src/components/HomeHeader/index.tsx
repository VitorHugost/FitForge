import { MaterialIcons } from '@expo/vector-icons';
import { HStack, Heading, Icon, Text, VStack } from "native-base";
import { TouchableOpacity } from "react-native";
import { UserPhoto } from "../UserPhoto";
import { UseAuth } from '@hooks/useAuth';
import defaultPhoto from '@assets/userPhotoDefault.png'
import { api } from '@services/api';

export function HomeHeader() {
  const { user, signOut } = UseAuth();

  return (
    <HStack bg="gray.600" pt={16} pb={5} px={8} alignItems="center">
      <UserPhoto
        source={user.avatar ? {uri: `${api.defaults.baseURL}/avatar/${user.avatar}`} : defaultPhoto}
        size={16}
        alt="Photo Profile"
        mr={4}
      />

      <VStack flex={1}>
        <Text color="gray.100" fontSize="md">
          Olá,
        </Text>
        <Heading color="gray.100" fontSize="md" fontFamily="heading">
          {user.name}
        </Heading>
      </VStack>

      <TouchableOpacity onPress={signOut}>
        <Icon as={MaterialIcons} name="logout" color="gray.200" size={7} />
      </TouchableOpacity>
    </HStack>
  );
}