import { useState, createContext } from "react";

//* CONTEXT *//
//* CONTEXT *//

interface ContextProps {
  sideMenuOpen: boolean;
  onToggleSidebar: (value: boolean) => void;
}

export const UIContext = createContext({} as ContextProps);

//* PROVIDER *//
//* PROVIDER *//

const UI_INITIAL_STATE = {
  sideMenuOpen: false,
};

export const UIProvider = ({ children }: { children: React.ReactNode }) => {
  const [sideMenuOpen, setSideMenuOpen] = useState<boolean>(
    UI_INITIAL_STATE.sideMenuOpen
  );

  const onToggleSidebar = (value: boolean): void => setSideMenuOpen(value);

  return (
    <UIContext.Provider
      value={{
        // properties
        sideMenuOpen,

        // methods
        onToggleSidebar,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
