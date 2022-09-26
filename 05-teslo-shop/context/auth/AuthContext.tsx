import { createContext, useState } from "react";
import Cookies from "js-cookie";
import tesloApi from "../../api/tesloApi";
import { IUser } from "../../interfaces";

//* CONTEXT *//
//* CONTEXT *//
interface AuthContextProps {
  isLoggedIn: boolean;
  user?: IUser;
  onLogin: (email: string, password: string) => Promise<boolean>;
  onLogout: () => void;
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
