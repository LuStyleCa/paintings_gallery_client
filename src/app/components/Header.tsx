"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "../AuthContext";
import paths from "../paths";
import { Menu, X } from "lucide-react"; // optional icon library

const Header = () => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const menuItems = (
  <>
    <Link href={paths.home} onClick={() => setMenuOpen(false)}>
      <span className="px-4 py-2 block">Home</span>
    </Link>
    <Link href={paths.galleries} onClick={() => setMenuOpen(false)}>
      <span className="px-4 py-2 block">Galleries</span>
    </Link>
    <Link href={paths.about} onClick={() => setMenuOpen(false)}>
      <span className="px-4 py-2 block">About me</span>
    </Link>
    <Link href={paths.exhibitions} onClick={() => setMenuOpen(false)}>
      <span className="px-4 py-2 block">Exhibitions</span>
    </Link>
    <Link href={paths.contact} onClick={() => setMenuOpen(false)}>
      <span className="px-4 py-2 block">Contact</span>
    </Link>

    {user?.role === "ADMIN" && (
      <Link href={paths.admin} onClick={() => setMenuOpen(false)}>
        <span className="px-4 py-2 block">Admin</span>
      </Link>
    )}

    {user ? (
      <button
        onClick={() => {
          logout();
          setMenuOpen(false);
        }}
        className="px-4 py-2 block"
      >
        Log out
      </button>
    ) : (
      <>
        <Link href={paths.login} onClick={() => setMenuOpen(false)}>
          <span className="px-4 py-2 block">Log in</span>
        </Link>
        <Link href={paths.register} onClick={() => setMenuOpen(false)}>
          <span className="px-4 py-2 block">Register</span>
        </Link>
      </>
    )}
  </>
);


  return (
    <header className="bg-zinc-700 text-white fixed top-0 left-0 w-full border-b border-white z-10">
      <nav className="flex items-center justify-between p-4 max-w-5xl mx-auto">
        <div className="text-lg font-semibold">ToonArt</div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4">{menuItems}</div>

        {/* Burger Icon */}
        <button className="md:hidden" onClick={toggleMenu}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-zinc-800 border-t border-white p-4">
          {menuItems}
        </div>
      )}
    </header>
  );
};

export default Header;
