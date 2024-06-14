import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/component/AuthProvider";
import { Session } from "next-auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Auth",
  description: "Auth",
};

export default function RootLayout({
  children, session,
}: Readonly<{
  children: React.ReactNode;
  session: Session;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>
          <AuthProvider session={session}>{children}</AuthProvider>
        </main>
      </body>
    </html>
  );
}
