import Link from "next/link";
import { useState } from 'react';
import Logo from "./logo";

export default function Header() {
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <header className="fixed top-0 w-full bg-[#f9fafb]  bg-opacity-20  z-50">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Logo />
            <span className="text-xl font-bold"><span className="text-xl font-bold text-[#7201a8]">Tal</span>Translate</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/login" className="text-sm font-medium hover:text-indigo-600 transition-colors">
              Login
            </Link>
            <Link href="/signup" className="px-4 py-2 bg-[#431685] text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium cursor-pointer">
              SignUp
            </Link>
          </div>

          <button
            className="md:hidden p-2 text-xl"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </nav>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-6 py-4 flex flex-col gap-4">
              <a
                href="#equipes"
                className="text-sm font-medium hover:text-indigo-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </a>
              <a className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium">
                SignUp
              </a>
            </div>
          </div>
        )}
      </header>
  );
}