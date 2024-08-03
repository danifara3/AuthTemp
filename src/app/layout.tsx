import type { Metadata } from "next";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";


export const metadata: Metadata = {
  title: "Auth",
  description: "Auth",
};

export default function RootLayout({
  children,
  //  session,
}: Readonly<{
  children: React.ReactNode;
  // session: Session;
}>) {
  return (
    <html lang="en">
      <body className="">
        <main>
          <AuthProvider >{children}</AuthProvider>
        </main>
      </body>
    </html>
  );
}
