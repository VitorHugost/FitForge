import { Button } from "@components/Button";
import { HeaderScreen } from "@components/HeaderScreen";
import { Input } from "@components/Input";
import { UserPhoto } from "@components/UserPhoto";

import { UseAuth } from "@hooks/useAuth";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import {
  Center,
  Heading,
  ScrollView,
  Skeleton,
  Text,
  VStack,
  useToast,
} from "native-base";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { TouchableOpacity } from "react-native";

import { yupResolver } from "@hookform/resolvers/yup";
import defaultPhoto from '@assets/userPhotoDefault.png'
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import * as yup from "yup";

interface FormDataProps {
  name: string;
  email: string;
  password: string;
  old_password: string;
  confirm_password: string;
}

const profileSchema = yup.object({
  name: yup.string().required("informe o nome"),
  password: yup
    .string()
    .min(8, "A senha deve conter pelo menos 8 caracteres")
    .nullable()
    .transform((value) => (!!value ? value : null)),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password")], "A confirmação de senha não confere."),
  // .when('password', {
  //   is: (Field: any) => Field,
  //   then: yup
  //     .string()
  //     .nullable()
  //     .required('Informe a confirmação da senha.')
  //     .transform((value) => !!value ? value : null)
  // }),
});

export function Profile() {
  const { userUpdate, user } = UseAuth();
  const toast = useToast();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver<any>(profileSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
    },
  });
  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [userPhoto, setUserphoto] = useState();
  const PHOTO_SIZE = 33;

  type FileProps = FileSystem.FileInfo & {
    size?: number;
  };

  async function handleUserPhoto() {
    setPhotoIsLoading(true);
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      });

      if (photoSelected.canceled) {
        return;
      }
      if (photoSelected.assets[0].uri) {
        const photoInfo: FileProps = await FileSystem.getInfoAsync(
          photoSelected.assets[0].uri
        );

        if (photoInfo.size && photoInfo.size / 1024 / 1024 > 5) {
          return toast.show({
            title: "Imagem é muito grande, superior a 5MB.",
            placement: "top",
            bgColor: "red.500",
          });
        }

        const fileExtension = photoSelected.assets[0].uri.split(".").pop();

        const photoFile = {
          name: `${user.name}.${fileExtension}`.toLocaleLowerCase(),
          uri: photoSelected.assets[0].uri,
          type: `${photoSelected.assets[0].type}/${fileExtension}`,
        } as any;

        const userPhotoUploadForm = new FormData();
        userPhotoUploadForm.append("avatar", photoFile);

        const userUpdateResponse = await api.patch(
          "/users/avatar",
          userPhotoUploadForm,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        const userUpdated = user;
        userUpdated.avatar = userUpdateResponse.data.avatar

          userUpdate(userUpdated)
        toast.show({
          title: "Foto atualizada com sucesso.",
          placement: "top",
          bgColor: "green.500",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setPhotoIsLoading(false);
    }
  }

  async function handleProfileUpdate(data: FormDataProps) {
    try {
      setIsLoading(true);

      await api.put("/users", data);

      userUpdate({
        name: data.name,
        email: data.email,
        avatar: userPhoto,
        id: user.id,
      });
      toast.show({
        title: "Perfil atualizado com sucesso",
        placement: "top",
        bgColor: "green.500",
      });
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possivel atualizar. Tente novamente";
      setIsLoading(false);

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <VStack flex={1}>
      <HeaderScreen title="Perfil" />
      <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
        <Center px={8} mt={6}>
          {photoIsLoading ? (
            <Skeleton
              w={PHOTO_SIZE}
              h={PHOTO_SIZE}
              rounded="full"
              startColor="gray.500"
              endColor="gray.400"
            />
          ) : (
            <UserPhoto size={33}  source={user.avatar ? {uri: `${api.defaults.baseURL}/avatar/${user.avatar}`} : defaultPhoto} alt="Image User" />
          )}
          <TouchableOpacity onPress={handleUserPhoto}>
            <Text
              color="green.500"
              fontWeight="bold"
              fontSize="md"
              mt={2}
              mb={8}
            >
              Alterar Foto
            </Text>
          </TouchableOpacity>

          <Controller
            name="name"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder="Nome"
                bg="gray.600"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Email"
                bg="gray.600"
                isDisabled
                _disabled={{ backgroundColor: "gray.500" }}
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          <Heading
            mb={2}
            mt={12}
            fontSize={16}
            color="gray.100"
            fontFamily="heading"
            alignSelf="flex-start"
          >
            Alterar senha
          </Heading>

          <Controller
            name="old_password"
            control={control}
            render={({ field: { onChange } }) => (
              <Input
                placeholder="Senha antiga"
                bg="gray.600"
                onChangeText={onChange}
                secureTextEntry
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field: { onChange } }) => (
              <Input
                bg="gray.600"
                secureTextEntry
                placeholder="Nova senha"
                onChangeText={onChange}
              />
            )}
          />
          <Controller
            control={control}
            name="confirm_password"
            render={({ field: { onChange } }) => (
              <Input
                bg="gray.600"
                secureTextEntry
                onChangeText={onChange}
                placeholder="Confirme a nova senha"
                errorMessage={errors.confirm_password?.message}
              />
            )}
          />

          <Button
            mt={4}
            title="Atualizar"
            isLoading={isLoading}
            onPress={handleSubmit(handleProfileUpdate)}
          />
        </Center>
      </ScrollView>
    </VStack>
  );
}
