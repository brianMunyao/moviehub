"use client";

import { useAuth } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import Button from "./button";
import Image from "next/image";
import { Menu, X, Search } from "lucide-react";
import Link from "next/link";
import NavUser from "./nav-user";
import { cn } from "@/lib/utils";

const NavBar = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { href: "/", label: "Home" },
    { href: "/movies", label: "Movies" },
    { href: "/tv-shows", label: "TV Shows" },
    { href: "/genres", label: "Genres" },
  ];

  return (
    <div
      className={cn(
        "w-full transition-all duration-500 fixed top-0 left-0 z-50",
        scrollY > 200 ? "bg-black" : "bg-transparent"
      )}
    >
      <div
        className={cn(
          "flex items-center justify-between max-w-6xl mx-auto px-4",
          scrollY > 200 ? "py-2" : "py-4"
        )}
      >
        <Image
          src="/logo-with-text-white.svg"
          alt="MovieHub Logo"
          width={130}
          height={50}
          className={cn(scrollY > 200 ? "w-auto" : "")}
        />

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-white hover:text-gray-300 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right side: search + user */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/search" className="text-white hover:text-gray-300 transition-colors">
            <Search size={22} />
          </Link>
          {isLoaded ? (
            isSignedIn ? (
              <NavUser />
            ) : (
              <Link href="/sign-in">
                <Button>Login</Button>
              </Link>
            )
          ) : (
            <div></div>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-black px-4 py-4 flex flex-col gap-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-white text-lg hover:text-gray-300 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          {/* Search for mobile */}
          <Link
            href="/search"
            className="flex items-center gap-2 text-white text-lg hover:text-gray-300 transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            <Search size={20} />
            Search
          </Link>

          {isLoaded && (
            <div>
              {isSignedIn ? (
                <NavUser />
              ) : (
                <Link href="/sign-in">
                  <Button className="w-full">Login</Button>
                </Link>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NavBar;
