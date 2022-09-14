import { useState, createContext } from "react";
import { v4 } from "uuid";

//* interfaces *//
import { Entry } from "../../interfaces";

//* CONTEXT *//
//* CONTEXT *//

interface ContextProps {
  entries: Entry[];
}

export const EntriesContext = createContext({} as ContextProps);

//* PROVIDER *//
//* PROVIDER *//

const ENTRIES_INITIAL_STATE: ContextProps = {
  entries: [
    {
      _id: v4(),
      description: "Ut esse amet minim ut deserunt.",
      createdAt: Number(new Date().getTime()),
      status: "pending",
    },
    {
      _id: v4(),
      description:
        "Velit labore tempor esse quis minim nisi ullamco excepteur cillum nostrud minim",
      createdAt: Number(new Date().getTime() - 1000000),
      status: "in-progress",
    },
    {
      _id: v4(),
      description: "Aliqua qui Lorem eiusmod non ex culpa pariatur.",
      createdAt: Number(new Date().getTime() - 50000000),
      status: "finished",
    },
  ],
};

export const EntriesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [entries, setEntries] = useState<Entry[]>(
    ENTRIES_INITIAL_STATE.entries
  );

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
