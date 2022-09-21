import { createContext, useState } from "react";

//* CONTEXT *//
interface UiContextProps {
  isMenuOpen: boolean;
  onToggleMenu: (value: boolean) => void;
}

export const UiContext = createContext({} as UiContextProps);

//* PROVIDER *//
interface UiProviderProps {
  children: React.ReactNode;
}

export const UiProvider = ({ children }: UiProviderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const onToggleMenu = (value: boolean) => {
    setIsMenuOpen(value);
  };

  return (
    <UiContext.Provider value={{ isMenuOpen, onToggleMenu }}>
      {children}
    </UiContext.Provider>
  );
};
