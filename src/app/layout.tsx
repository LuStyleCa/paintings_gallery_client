"use client";

import Header from "./components/Header";
import "../app/styles/globals.css";
import { AuthProvider } from "./AuthContext";
import { Toaster } from "react-hot-toast";
import { EmailProvider } from "./EmailContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">
        <AuthProvider>
          <EmailProvider>
            <Toaster position="bottom-right" />
            <Header />
            <div className="">{children}</div>
          </EmailProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
