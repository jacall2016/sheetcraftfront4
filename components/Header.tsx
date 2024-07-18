import React, { useState } from 'react';
import Link from 'next/link';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  weight: ['400'],
  style: ['italic', 'normal'],
  subsets: ['latin'],
});

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-primary flex items-center justify-between">
      <div className="flex items-center">
        <Link href="/">
          <img src="/images/logo.svg"  alt="Logo" className="w-20 p-2 cursor-pointer drop-shadow" />
        </Link>
        <Link href="/">
          <span className={`text-light hover:text-highlight font-light italic text-4xl text-shadow ${montserrat.className}`}>SheetCraft</span>
        </Link>
      </div>
      <nav className="hidden md:flex h-full mr-4">
        <Link href="/" className="nav-link flex items-center text-light hover:text-highlight bg-opacity-75 p-2 h-20">Home</Link>
        <Link href="/custom-scripts" className="nav-link flex items-center  text-light hover:text-highlight bg-opacity-75 p-2 h-20">Custom Scripts</Link>
        <Link href="/data-processing" className="nav-link flex items-center text-light hover:text-highlight bg-opacity-75 p-2 h-20">Data Processing</Link>
      </nav>
      <button
        className="md:hidden p-2 focus:outline-none text-light"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>
      {isOpen && (
        <nav className="md:hidden absolute top-16 left-0 w-full bg-primary flex flex-col items-start p-4">
          <Link href="/" className="nav-link p-2 rounded w-full text-left text-light hover:bg-opacity-75">Home</Link>
          <Link href="/custom-scripts" className="nav-link p-2 rounded w-full text-left text-light hover:bg-opacity-75">Custom Scripts</Link>
          <Link href="/data-processing" className="nav-link p-2 rounded w-full text-left text-light hover:bg-opacity-75">Data Processing</Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
