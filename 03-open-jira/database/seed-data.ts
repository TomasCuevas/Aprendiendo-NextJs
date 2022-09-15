interface SeedDataProps {
  entries: SeedEntry[];
}

interface SeedEntry {
  description: string;
  status: string;
  createdAt: number;
}

export const seedData: SeedDataProps = {
  entries: [
    {
      description: "Pendiente: Ut esse amet minim ut deserunt.",
      createdAt: Number(new Date().getTime()),
      status: "pending",
    },
    {
      description:
        "En progreso: Velit labore tempor esse quis minim nisi ullamco excepteur cillum nostrud minim",
      createdAt: Number(new Date().getTime() - 1000000),
      status: "in-progress",
    },
    {
      description:
        "Finalizada: Aliqua qui Lorem eiusmod non ex culpa pariatur.",
      createdAt: Number(new Date().getTime() - 50000000),
      status: "finished",
    },
  ],
};
