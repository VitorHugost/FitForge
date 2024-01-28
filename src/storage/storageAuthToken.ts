import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_TOKEN_STORAGE } from "@storage/storageConfig";

type StorageAuthTokenProps = {
  token: string;
  refresh_token: string;
};

export async function storageTokenSave({token, refresh_token}: StorageAuthTokenProps) {
  await AsyncStorage.setItem(
    USER_TOKEN_STORAGE,
    JSON.stringify({ token, refresh_token })
  );
}

export async function storageTokenGet(){
    const response = await AsyncStorage.getItem(USER_TOKEN_STORAGE);
    const { token, refresh_token }: StorageAuthTokenProps = response
      ? JSON.parse(response)
      : {};
    return { token, refresh_token }
}
export async function storageTokenRemove(){
    const token = await AsyncStorage.removeItem(USER_TOKEN_STORAGE)
    return token
}