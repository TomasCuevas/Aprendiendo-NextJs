import { useState, createContext, PropsWithChildren } from "react";
import { v4 } from "uuid";

//* interfaces *//
import { Entry } from "../interfaces";

//* CONTEXT *//
//* CONTEXT *//

interface ContextProps {
  entries: Entry[];
  addNewEntry: (entry: Entry) => void;
}

export const EntriesContext = createContext({} as ContextProps);

//* PROVIDER *//
//* PROVIDER *//

const ENTRIES_INITIAL_STATE: ContextProps = {
  entries: [
    {
      _id: v4(),
      description: "Pendiente: Ut esse amet minim ut deserunt.",
      createdAt: Number(new Date().getTime()),
      status: "pending",
    },
    {
      _id: v4(),
      description:
        "En progreso: Velit labore tempor esse quis minim nisi ullamco excepteur cillum nostrud minim",
      createdAt: Number(new Date().getTime() - 1000000),
      status: "in-progress",
    },
    {
      _id: v4(),
      description:
        "Finalizada: Aliqua qui Lorem eiusmod non ex culpa pariatur.",
      createdAt: Number(new Date().getTime() - 50000000),
      status: "finished",
    },
  ],
  addNewEntry: () => {},
};

export const EntriesProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [entries, setEntries] = useState<Entry[]>(
    ENTRIES_INITIAL_STATE.entries
  );

  const addNewEntry = (entry: Entry) => {
    setEntries((prevEntries) => [...prevEntries, entry]);
  };

  return (
    <EntriesContext.Provider
      value={{
        entries,
        addNewEntry,
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
