export const metadata = {
  title: "DropMentor AI"
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body style={{
        margin: 0,
        fontFamily: "Arial",
        background: "#0f172a",
        color: "white"
      }}>
        {children}
      </body>
    </html>
  );
}
