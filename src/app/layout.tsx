"use client";

import Header from "./components/Header";
import "../app/styles/globals.css";
import { AuthProvider } from "./AuthContext";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">
        <AuthProvider>
          <Toaster position="bottom-right" />
          <Header/>
          <div className="">{children}</div>
        </AuthProvider>
      </body>
    </html>
  );
}
