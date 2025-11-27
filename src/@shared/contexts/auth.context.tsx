import { SecutiryDTO } from "@shared/dtos/secutiry.dto";
import { UserDTO } from "@shared/dtos/user.dto";
import api from "@shared/helper/api";

import { storageAuthTokenGet, storageAuthTokenRemove, storageAuthTokenSave } from "@shared/storage/storageAuthToken";
import { storageUserGet, storageUserRemove, storageUserSave } from "@shared/storage/storageUser";
import { createContext, useEffect, useState } from "react";

export type AuthContextDataProps = {
    user: UserDTO;
    signIn: (nickName: string, senha: string) => Promise<void>;
    signOut: () => Promise<void>;
    isLoadingUserStorageData: boolean;
}

/* criação do contexto */
export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

/* compartilhamento do contexto */

type AuthContextProviderProps = {
    children: React.ReactNode;
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
    const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true);
    const [user, setUser] = useState<UserDTO>({} as UserDTO);

    const userAndSecurityUpdate = async (user: UserDTO, security: SecutiryDTO) => {
        api.defaults.headers.common['Authorization'] = `Bearer ${security.accessToken}`;
        setUser(user);
    }

    const storageUserAndSecuritySave = async (user: UserDTO, security: SecutiryDTO) => {
        try {
            console.log(user);
            await storageUserSave(user);
            await storageAuthTokenSave(security);
        } catch (error) {
            throw error;
        }
    }

    const storageUserAndSecurityRemove = async () => {
        try {
            await storageUserRemove();
            await storageAuthTokenRemove();
        } catch (error) {
            throw error;
        }
    }

    const signIn = async (nickName: string, senha: string) => {
        try {
            setIsLoadingUserStorageData(true);
            const response = await api.post("/security/login", { nickName, senha });
            const { data } = response.data;
            if (data.user && data.security) {
                await storageUserAndSecuritySave(data.user, data.security);
                userAndSecurityUpdate(data.user, data.security);
            }
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            setIsLoadingUserStorageData(false);
        }
    }

    const signOut = async () => {
        try {
            setIsLoadingUserStorageData(true);
            await storageUserAndSecurityRemove();
            setUser({} as UserDTO);
        } catch (error) {
            throw error;
        } finally {
            setIsLoadingUserStorageData(false);
        }
    }

    const loadUserData = async () => {
        try {
            setIsLoadingUserStorageData(true);
            const userLogged = await storageUserGet();
            const security = await storageAuthTokenGet();
            if (userLogged && security) {
                userAndSecurityUpdate(userLogged, security);
            }
        } catch (error) {
            throw error;
        } finally {
            setIsLoadingUserStorageData(false);
        }
    }

    useEffect(() => {
        loadUserData();
    }, []);

    useEffect(() => {
        const subscribe = api.registerInterceptTokenManager(signOut);   
        return () => {
            subscribe();
        }   
    }, [signOut]);

    return (
        <AuthContext.Provider
            value={{
                isLoadingUserStorageData,
                user,
                signIn,
                signOut
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}