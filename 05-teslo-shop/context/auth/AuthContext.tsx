import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useRouter } from "next/router";
import tesloApi from "../../api/tesloApi";
import { IUser } from "../../interfaces";

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
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<IUser>();

  useEffect(() => {
    validateToken();
  }, []);

  const validateToken = async () => {
    if (!Cookies.get("token")) return;

    try {
      const { data } = await tesloApi.post("/user/validate-token");
      const { token, user } = data;

      Cookies.set("token", token);

      setIsLoggedIn(true);
      setUser(user);
    } catch (error) {
      Cookies.set("token", "");
    }
  };

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
    Cookies.remove("token");
    Cookies.remove("cart");
    Cookies.remove("address");
    Cookies.remove("address2");
    Cookies.remove("city");
    Cookies.remove("country");
    Cookies.remove("firstName");
    Cookies.remove("lastName");
    Cookies.remove("phone");
    Cookies.remove("zip");
    setIsLoggedIn(false);
    setUser(undefined);
    router.reload();
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
