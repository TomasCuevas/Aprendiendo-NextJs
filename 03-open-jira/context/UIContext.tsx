import { useState, createContext, PropsWithChildren } from "react";

//* CONTEXT *//
//* CONTEXT *//

interface ContextProps {
  isAddingEntry: boolean;
  sideMenuOpen: boolean;
  onToggleAddingEntry: (value: boolean) => void;
  onToggleSidebar: (value: boolean) => void;
}

export const UIContext = createContext({} as ContextProps);

//* PROVIDER *//
//* PROVIDER *//

const UI_INITIAL_STATE = {
  sideMenuOpen: false,
  isAddingEntry: false,
};

export const UIProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [sideMenuOpen, setSideMenuOpen] = useState<boolean>(
    UI_INITIAL_STATE.sideMenuOpen
  );
  const [isAddingEntry, setIsAddingEntry] = useState<boolean>(
    UI_INITIAL_STATE.isAddingEntry
  );

  const onToggleSidebar = (value: boolean): void => setSideMenuOpen(value);
  const onToggleAddingEntry = (value: boolean): void => setIsAddingEntry(value);

  return (
    <UIContext.Provider
      value={{
        // properties
        isAddingEntry,
        sideMenuOpen,

        // methods
        onToggleAddingEntry,
        onToggleSidebar,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
