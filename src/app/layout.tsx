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
      <body className="bg-slate-900 antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}