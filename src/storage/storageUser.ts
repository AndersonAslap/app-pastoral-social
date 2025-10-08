import { UserDTO } from "@dtos/user.dto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_STORAGE } from "./storage.config";

export const storageUserSave = async (user: UserDTO) => {
  await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user));
};

export const storageUserGet = async (): Promise<UserDTO> => {
  const storage = await AsyncStorage.getItem(USER_STORAGE);
  const user: UserDTO = storage ? JSON.parse(storage) : {};
  return user;
};

export const storageUserRemove = async () => {
  await AsyncStorage.removeItem(USER_STORAGE);
};
