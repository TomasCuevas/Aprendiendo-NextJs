import { createContext, useState } from "react";
import Cookies from "js-cookie";
import tesloApi from "../../api/tesloApi";
import { IUser } from "../../interfaces";
import axios from "axios";

//* CONTEXT *//
//* CONTEXT *//
interface AuthContextProps {
  isLoggedIn: boolean;
  user?: IUser;
  onLogin: (email: string, password: string) => Promise<boolean>;
  onLogout: () => void;
  onRegister: (
    name: string,
    email: string,
    password: string
  ) => Promise<{ hasError: boolean; message?: string }>;
}

export const AuthContext = createContext({} as AuthContextProps);

//* PROVIDER *//
//* PROVIDER *//
interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<IUser>();

  const onLogin = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data } = await tesloApi.post("/user/login", { email, password });
      const { token, user } = data;

      Cookies.set("token", token);

      setIsLoggedIn(true);
      setUser(user);

      return true;
    } catch (error) {
      return false;
    }
  };

  const onRegister = async (
    name: string,
    email: string,
    password: string
  ): Promise<{ hasError: boolean; message?: string }> => {
    try {
      const { data } = await tesloApi.post("/user/register", {
        name,
        email,
        password,
      });
      const { token, user } = data;

      Cookies.set("token", token);

      setIsLoggedIn(true);
      setUser(user);

      return {
        hasError: false,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return { hasError: true, message: error.response?.data.message };
      }

      return {
        hasError: true,
        message: "No se pudo crear el usuario - intente de nuevo",
      };
    }
  };

  const onLogout = () => {
    setIsLoggedIn(false);
    setUser(undefined);
  };

  return (
    <AuthContext.Provider
      value={{
        // properties
        isLoggedIn,
        user,

        // methods
        onLogin,
        onLogout,
        onRegister,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
