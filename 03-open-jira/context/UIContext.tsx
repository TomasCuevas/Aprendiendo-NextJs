import { useState, createContext, PropsWithChildren } from "react";

//* CONTEXT *//
//* CONTEXT *//

interface ContextProps {
  isAddingEntry: boolean;
  isDraggin: boolean;
  sideMenuOpen: boolean;
  onToggleAddingEntry: (value: boolean) => void;
  onToggleDraggin: (value: boolean) => void;
  onToggleSidebar: (value: boolean) => void;
}

export const UIContext = createContext({} as ContextProps);

//* PROVIDER *//
//* PROVIDER *//

const UI_INITIAL_STATE = {
  isAddingEntry: false,
  isDraggin: false,
  sideMenuOpen: false,
};

export const UIProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isAddingEntry, setIsAddingEntry] = useState<boolean>(
    UI_INITIAL_STATE.isAddingEntry
  );
  const [isDraggin, setIsDraggin] = useState<boolean>(
    UI_INITIAL_STATE.isDraggin
  );
  const [sideMenuOpen, setSideMenuOpen] = useState<boolean>(
    UI_INITIAL_STATE.sideMenuOpen
  );

  const onToggleAddingEntry = (value: boolean): void => setIsAddingEntry(value);
  const onToggleDraggin = (value: boolean): void => setIsDraggin(value);
  const onToggleSidebar = (value: boolean): void => setSideMenuOpen(value);

  return (
    <UIContext.Provider
      value={{
        // properties
        isAddingEntry,
        isDraggin,
        sideMenuOpen,

        // methods
        onToggleAddingEntry,
        onToggleDraggin,
        onToggleSidebar,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
