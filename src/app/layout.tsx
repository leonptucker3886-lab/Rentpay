import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rent Payment Portal",
  description: "Secure online rent payment system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ minHeight: "100vh" }}>
        {children}
      </body>
    </html>
  );
}