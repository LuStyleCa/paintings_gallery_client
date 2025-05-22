"use client";

import Link from "next/link";
import { useAuth } from "../AuthContext";
import paths from "../paths";

const Header = () => {
  const { user, logout } = useAuth();
  return (
    <header className="bg-zinc-700 p-4 text-white fixed top-0 left-0 w-full">
      <nav className="flex justify-between items-center max-w-5xl mx-auto">
        <Link href={paths.home}>
          <span className="px-4 cursor-pointer">Home</span>
        </Link>
        <Link href={paths.galleries}>
          <span className="px-4 cursor-pointer">Galleries</span>
        </Link>
        <Link href={paths.about}>
          <span className="px-4 cursor-pointer">About me</span>
        </Link>
        <Link href={paths.exhibitions}>
          <span className="px-4 cursor-pointer">Exhibitions</span>
        </Link>
        <Link href={paths.contact}>
          <span className="px-4 cursor-pointer">Contact</span>
        </Link>
        {user?.role === "ADMIN" && (
          <Link href={paths.admin}>
            <span className="px-4 cursor-pointer ml-auto">Admin</span>
          </Link>
        )}
        <div>
          {user ? (
            <>
              <button onClick={logout}>Log out</button>
            </>
          ) : (
            <div>
              <Link href={paths.login}>
                <span className="px-4 cursor-pointer">Log in</span>
              </Link>

              <Link href={paths.register}>
                <span className="px-4 cursor-pointer">Register</span>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
