import { createContext, useState } from "react";
import { IUser } from "../../interfaces";

//* CONTEXT *//
//* CONTEXT *//
interface AuthContextProps {
  isLoggedIn: boolean;
  user?: IUser;
  onLogin: (user: IUser) => void;
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

  const onLogin = (user: IUser) => {
    setIsLoggedIn(true);
    setUser(user);
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
