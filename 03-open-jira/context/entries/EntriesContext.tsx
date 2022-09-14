import { useState, createContext } from "react";

//* CONTEXT *//
//* CONTEXT *//

interface ContextProps {
  entries: [];
}

export const EntriesContext = createContext({} as ContextProps);

//* PROVIDER *//
//* PROVIDER *//

const ENTRIES_INITIAL_STATE = {
  entries: [],
};

export const EntriesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [entries, setEntries] = useState<[]>(ENTRIES_INITIAL_STATE.entries);

  return (
    <EntriesContext.Provider
      value={{
        entries,
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
