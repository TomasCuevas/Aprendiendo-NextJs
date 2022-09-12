import { useState, useContext, createContext } from "react";

interface ContextProps {
  sideMenuOpen: boolean;
}

export const UIContext = createContext({} as ContextProps);

export interface UIState {
  sideMenuOpen: boolean;
}

const UI_INITIAL_STATE: UIState = {
  sideMenuOpen: false,
};

export const UIProvider = ({ children }: { children: React.ReactNode }) => {
  const [sideMenuOpen, setSideMenuOpen] = useState<boolean>(
    UI_INITIAL_STATE.sideMenuOpen
  );

  return (
    <UIContext.Provider
      value={{
        sideMenuOpen,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
