"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div
        className={`hidden lg:flex flex-row py-3 px-40 justify-between items-center font-poppinsRegular bg-[#17181c] text-white`}
      >
        <Link href="/" className="flex flex-row gap-4 text-xl items-center">
          <div className="relative">
            <Image src="/images/logo_white.png" width={40} height={40} alt="logo" />
          </div>
          blepo
        </Link>
        <div className="hidden lg:flex flex-row items-center text gap-10 font-poppinsThin">
          <Link href="https://github.com/thedudeontitan/blepo" target="_blank">
            Github
          </Link>
          <Link href="https://github.com/thedudeontitan/blepo" target="_blank">
            Documentation
          </Link>
          <Link href="#features">Features</Link>
          <Link href="/">Whitepaper</Link>
        </div>
      </div>

      <div className="flex flex-col lg:hidden text-white top-0 bottom-0 right-0 left-0">
        <div className="inline-flex justify-between items-center px-4">
          <Link href="/" className="flex flex-row gap-4 text-xl items-center py-3 px-5">
            <div className="relative">
              <Image src="/images/logo_white.png" width={40} height={40} alt="logo" />
            </div>
            blepo
          </Link>
          <button onClick={handleMenuToggle} className="text-2xl">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        {menuOpen && (
          <div className={`lg:hidden flex flex-col items-center text-white py-4 font-bold bg-[#17181c] h-full`}>
            <Link href="https://github.com/thedudeontitan/blepo" target="_blank" className="py-2">
              Github
            </Link>
            <Link href="https://github.com/thedudeontitan/blepo" target="_blank" className="py-2">
              Documentation
            </Link>
            <Link href="#features" className="py-2">
              Features
            </Link>
            <Link href="/" className="py-2">
              Whitepaper
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
