import { api } from "@services/api";
import { UserDTO } from "@dtos/UserDTO";
import {
  storageTokenGet,
  storageTokenRemove,
  storageTokenSave,
} from "@storage/storageAuthToken";
import { ReactNode, createContext, useEffect, useState } from "react";
import {
  storageGetUser,
  storageUserRemove,
  storageUserSave,
} from "@storage/storageUser";

export type AuthContextDataProps = {
  user: UserDTO;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  userUpdate: (user: UserDTO) => void;
  isLoadingUserData: boolean;
};
type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO);
  const [isLoadingUserData, setLoadingUserData] = useState(true);

  async function userAndTokenUpdate({
    user,
    token,
  }: {
    user: UserDTO;
    token: string;
  }) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setUser(user);
  }

  async function storageUserAndTokenSave({
    user,
    token,
    refresh_token,
  }: {
    user: UserDTO;
    token: string;
    refresh_token: string;
  }) {
    try {
      setLoadingUserData(true);

      await storageUserSave(user);
      await storageTokenSave({token:token, refresh_token:refresh_token});
    } catch (error) {
      throw error;
    } finally {
      setLoadingUserData(false);
    }
  }

  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post("/sessions", { email, password });

      if (data.user && data.token && data.refresh_token) {
        setLoadingUserData(true);

        await storageUserAndTokenSave({
          user: data.user,
          token: data.token,
          refresh_token: data.refresh_token,
        });
        userAndTokenUpdate({
          user: data.user,
          token: data.token,
        });
      }
    } catch (error) {
      throw error;
    } finally {
      setLoadingUserData(false);
    }
  }

  async function signOut() {
    try {
      setLoadingUserData(true);
      setUser({} as UserDTO);
      await storageUserRemove();
      await storageTokenRemove();
    } catch (error) {
      throw error;
    } finally {
      setLoadingUserData(false);
    }
  }

  async function loadUserData() {
    try {
      setLoadingUserData(true);

      const userLogged = await storageGetUser();
      const {token} = await storageTokenGet();

      if (token && userLogged) {
        userAndTokenUpdate({ user: userLogged, token: token });
      }
    } catch (error) {
      throw error;
    } finally {
      setLoadingUserData(false);
    }
  }

  async function userUpdate(userUpdate: UserDTO) {
    try {
      setUser(userUpdate);
      await storageUserSave(userUpdate);
    } catch (error) {
      throw error;
    } finally {
    }
  }

  useEffect(() => {
    loadUserData();
  }, []);

  useEffect(() => {
    const subscribe = api.registerInterceptTokenManager(signOut);

    return () => {
      subscribe();
    };
  }, [signOut]);

  return (
    <AuthContext.Provider
      value={{ user, userUpdate, signIn, signOut, isLoadingUserData }}
    >
      {children}
    </AuthContext.Provider>
  );
}
