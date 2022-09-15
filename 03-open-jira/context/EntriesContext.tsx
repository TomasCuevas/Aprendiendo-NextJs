import { useState, createContext, PropsWithChildren } from "react";

//* interfaces *//
import { Entry } from "../interfaces";

//* CONTEXT *//
//* CONTEXT *//

interface ContextProps {
  entries: Entry[];
  addNewEntry: (entry: Entry) => void;
  entryUpdated: (entry: Entry) => void;
}

export const EntriesContext = createContext({} as ContextProps);

//* PROVIDER *//
//* PROVIDER *//

const ENTRIES_INITIAL_STATE: ContextProps = {
  entries: [],
  addNewEntry: () => {},
  entryUpdated: () => {},
};

export const EntriesProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [entries, setEntries] = useState<Entry[]>(
    ENTRIES_INITIAL_STATE.entries
  );

  const addNewEntry = (entry: Entry): void => {
    setEntries((prevEntries) => [...prevEntries, entry]);
  };

  const entryUpdated = (entryUpdated: Entry): void => {
    const newEntries = entries.map((entry) => {
      if (entry._id === entryUpdated._id) {
        entry.status = entryUpdated.status;
        entry.description = entryUpdated.description;
      }

      return entry;
    });

    setEntries(newEntries);
  };

  return (
    <EntriesContext.Provider
      value={{
        // properties
        entries,

        // methods
        addNewEntry,
        entryUpdated,
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
