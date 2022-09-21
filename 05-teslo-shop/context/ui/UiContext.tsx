import { createContext, useState } from "react";

//* CONTEXT *//
interface UiContextProps {
  isMenuOpen: boolean;
  onToggleMenu: () => void;
}

export const UiContext = createContext({} as UiContextProps);

//* PROVIDER *//
interface UiProviderProps {
  children: React.ReactNode;
}

export const UiProvider = ({ children }: UiProviderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const onToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <UiContext.Provider value={{ isMenuOpen, onToggleMenu }}>
      {children}
    </UiContext.Provider>
  );
};
