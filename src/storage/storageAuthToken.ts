import AsyncStorage from "@react-native-async-storage/async-storage";
import { AUTH_TOKEN_STORAGE } from "./storage.config";
import { SecutiryDTO } from "@dtos/secutiry.dto";

export async function storageAuthTokenSave(secutiry: SecutiryDTO) {
  await AsyncStorage.setItem(AUTH_TOKEN_STORAGE, JSON.stringify(secutiry));
}

export async function storageAuthTokenGet(): Promise<SecutiryDTO> {
  const storage = await AsyncStorage.getItem(AUTH_TOKEN_STORAGE);
  const secutiry: SecutiryDTO = storage ? JSON.parse(storage) : {};
  return secutiry;
}

export async function storageAuthTokenGetAccessToken(): Promise<string> {
  const storage = await AsyncStorage.getItem(AUTH_TOKEN_STORAGE);
  const secutiry: SecutiryDTO = storage ? JSON.parse(storage) : {};
  return secutiry.accessToken;
}

export async function storageAuthTokenGetRefreshToken(): Promise<string> {
  const storage = await AsyncStorage.getItem(AUTH_TOKEN_STORAGE);
  const secutiry: SecutiryDTO = storage ? JSON.parse(storage) : {};
  return secutiry.refreshToken;
}

export async function storageAuthTokenRemove() {
  await AsyncStorage.removeItem(AUTH_TOKEN_STORAGE);
}
