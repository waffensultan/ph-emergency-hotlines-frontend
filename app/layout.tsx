import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="bg-background text-foreground w-screen h-screen px-5 overflow-x-hidden md:px-36"
      >
        {children}
      </body>
    </html>
  );
}