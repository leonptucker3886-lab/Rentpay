import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rent Payments",
  description: "Secure monthly rent payment portal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: "#0f172a", minHeight: "100vh" }}>
        {children}
      </body>
    </html>
  );
}