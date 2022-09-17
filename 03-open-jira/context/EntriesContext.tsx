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
  entryDeleted: (id: string) => Promise<boolean>;
  entryUpdated: (entryToUpdated: Entry, showSnackbar?: boolean) => void;
}

export const EntriesContext = createContext({} as ContextProps);

//* PROVIDER *//
//* PROVIDER *//

export const EntriesProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const { enqueueSnackbar } = useSnackbar();

  // add
  const addNewEntry = async (description: string) => {
    const { data: newEntry } = await entriesApi.post<Entry>("/entries", {
      description,
    });
    setEntries((prevEntries) => [...prevEntries, newEntry]);
  };

  // update
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

  // delete
  const entryDeleted = async (id: string): Promise<boolean> => {
    try {
      const { data } = await entriesApi.delete(`/entries/${id}`);

      const newEntries = entries.filter((entry) => entry._id !== id);
      setEntries(newEntries);

      return true;
    } catch (error) {
      enqueueSnackbar("Error al eliminar", {
        variant: "error",
        autoHideDuration: 2000,
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      return false;
    }
  };

  // refresh
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
        entryDeleted,
        entryUpdated,
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
