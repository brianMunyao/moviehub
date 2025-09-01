"use client";

import React from "react";
import { Github } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="w-full bg-black border-t border-white/10 mt-16">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2 text-white">
          <Image
            src="/logo-with-text-white.svg"
            alt="MovieHub Logo"
            width={130}
            height={50}
            className="w-auto"
          />
        </div>

        <nav className="flex gap-6 text-gray-400 text-sm">
          <Link
            href="https://briankalusi.vercel.app"
            className="hover:text-white transition-colors"
          >
            About
          </Link>
          <Link
            href="https://briankalusi.vercel.app/contact"
            className="hover:text-white transition-colors"
          >
            Contact
          </Link>
        </nav>

        <div className="flex gap-4 text-gray-400">
          <Link
            href="https://github.com/brianMunyao"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white flex items-center gap-1"
          >
            <Github className="w-5 h-5" /> GitHub
          </Link>
        </div>
      </div>

      <div className="border-t border-white/10 text-center py-4 text-xs text-gray-500">
        © {new Date().getFullYear()} MovieHub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
