interface LightLayoutProps {
  children: JSX.Element | JSX.Element[];
}

export const LightLayout = ({ children }: LightLayoutProps) => {
  return (
    <div
      style={{
        backgroundColor: "#111",
        borderRadius: "5px",
        padding: "10px",
      }}
    >
      <h3>Dark Layout</h3>
      <div>{children}</div>
    </div>
  );
};
