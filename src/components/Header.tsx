"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useTheme } from "@/lib/theme-provider";
import { XIcon, MenuIcon } from "lucide-react";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "/public", label: "Public Elections" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-primary"
            >
              <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" />
            </svg>
            <span className="text-xl font-bold">ChainElect</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`hover:text-primary transition-colors ${
                  pathname === link.href ? "text-primary font-medium" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-4">
              <Link
                href="/voter/login"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Voter Login
              </Link>
              <Link
                href="/candidate/login"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Candidate Login
              </Link>
              <Link
                href="/admin/login"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Admin
              </Link>
            </div>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-muted transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? "🌙" : "☀️"}
            </button>
          </nav>

          {/* Mobile Navigation Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleTheme}
              className="p-2 mr-2 rounded-full hover:bg-muted transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? "🌙" : "☀️"}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md hover:bg-muted transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <XIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 flex flex-col space-y-4 pb-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block transition-colors ${
                  pathname === link.href ? "text-primary font-medium" : "text-muted-foreground"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <hr className="border-muted my-2" />
            <Link
              href="/voter/login"
              className="block text-muted-foreground hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Voter Login
            </Link>
            <Link
              href="/candidate/login"
              className="block text-muted-foreground hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Candidate Login
            </Link>
            <Link
              href="/admin/login"
              className="block text-muted-foreground hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Admin Login
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
