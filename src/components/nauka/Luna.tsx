function Section({
  children,
  background,
  style,
}: {
  children: React.ReactNode;
  background?: string;
  style?: React.CSSProperties;
}) {
  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        padding: "80px 24px",
        background: background || C.contentBg,
        boxSizing: "border-box",
        ...style,
      }}
    >
      <div style={{ maxWidth: "480px", margin: "0 auto", position: "relative" }}>
        {children}
      </div>
    </section>
  );
}
function Section({
  children,
  background,
  style,
}: {
  children: React.ReactNode;
  background?: string;
  style?: React.CSSProperties;
}) {
  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        padding: "80px 24px",
        background: background || C.contentBg,
        boxSizing: "border-box",
        ...style,
      }}
    >
      <div style={{ maxWidth: "480px", margin: "0 auto", position: "relative" }}>
        {children}
      </div>
    </section>
  );
}
