"use client";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div>
      <nav className="fixed w-full top-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-blue-900/50">
        <source
          src="https://tkxel.com/wp-content/uploads/2025/11/tkxel-hero-animation-cropped.mp4"
          type="video/mp4"
        ></source>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="text-2xl font-bold bg-linear-to-br from-[#0c033f] via-[#2107b6] to-white text-transparent bg-clip-text animate-slide-in-left">
              <span className="tracking-wide">
                ABCDM<span className="font-normal">edia</span> CRM
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6">
              <Link
                href="/"
                className="text-blue-200 hover:text-blue-600 hover:underline transition-colors duration-300"
              >
                Home
              </Link>
              <Link
                href="/pages/contact"
                className="text-blue-200 hover:text-blue-600 hover:underline transition-colors duration-300"
              >
                Contact
              </Link>
              <Link
                href="/authentication/client/register"
                className="text-blue-200 hover:text-blue-600 hover:underline transition-colors duration-300"
              >
                Register
              </Link>
              <Link
                href="/authentication/client/login"
                className="text-blue-200 hover:text-blue-600 hover:underline transition-colors duration-300"
              >
                Login
              </Link>
              <Link
                href="/authentication/admin"
                className="px-6 py-1 border border-blue-500 text-blue-400 rounded-lg hover:bg-blue-500/10 transition-all duration-300"
              >
                Admin Access
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-3 animate-fade-in-up">
              <Link
                href="/"
                className="text-blue-200 hover:text-blue-600 hover:underline transition-colors duration-300"
              >
                Home
              </Link>
              <Link
                href="#services"
                className="block text-blue-200 hover:text-white transition-colors duration-300"
              >
                Services
              </Link>
              <Link
                href="#contact"
                className="block text-blue-200 hover:text-white transition-colors duration-300"
              >
                Contact
              </Link>
              <Link
                href="/authentication/client/register"
                className="text-white hover:drop-shadow transition-all duration-300 text-center"
              >
                Register
              </Link>
              <Link
                href="/authentication/client/login"
                className="block px-6 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all duration-300 text-center"
              >
                Sign In
              </Link>
              <Link
                href="/authentication/admin"
                className="block px-6 py-2 border border-blue-500 text-blue-400 rounded-lg hover:bg-blue-500/10 transition-all duration-300 text-center"
              >
                Admin
              </Link>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
