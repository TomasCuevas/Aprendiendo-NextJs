import { useState, createContext, PropsWithChildren, useEffect } from "react";

//* interfaces *//
import { Entry } from "../interfaces";
import { entriesApi } from "../api";

//* CONTEXT *//
//* CONTEXT *//

interface ContextProps {
  entries: Entry[];
  addNewEntry: (description: string) => void;
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

  const addNewEntry = async (description: string) => {
    const { data: newEntry } = await entriesApi.post<Entry>("/entries", {
      description,
    });
    setEntries((prevEntries) => [...prevEntries, newEntry]);
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

  const refreshEntries = async () => {
    const { data: entries } = await entriesApi.get<Entry[]>("/entries");
    setEntries(entries);
  };

  useEffect(() => {
    refreshEntries();
  }, []);

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
