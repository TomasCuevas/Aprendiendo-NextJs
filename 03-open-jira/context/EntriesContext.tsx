import { useState, createContext, PropsWithChildren, useEffect } from "react";
import { useSnackbar } from "notistack";

//* interfaces *//
import { Entry } from "../interfaces";
import { entriesApi } from "../api";

//* CONTEXT *//
//* CONTEXT *//

interface ContextProps {
  entries: Entry[];
  addNewEntry: (description: string) => void;
  entryUpdated: (entryToUpdated: Entry, showSnackbar?: boolean) => void;
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
  const { enqueueSnackbar } = useSnackbar();

  const addNewEntry = async (description: string) => {
    const { data: newEntry } = await entriesApi.post<Entry>("/entries", {
      description,
    });
    setEntries((prevEntries) => [...prevEntries, newEntry]);
  };

  const entryUpdated = async (entryToUpdated: Entry, showSnackbar = false) => {
    const { data: entryUpdated } = await entriesApi.put<Entry>(
      `/entries/${entryToUpdated._id}`,
      { description: entryToUpdated.description, status: entryToUpdated.status }
    );

    const newEntries = await entries.map((entry) => {
      if (entry._id === entryUpdated._id) entry = entryUpdated;
      return entry;
    });

    if (showSnackbar) {
      enqueueSnackbar("Entrada actualizada", {
        variant: "success",
        autoHideDuration: 2000,
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    }

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
