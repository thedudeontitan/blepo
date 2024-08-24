"use client"
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [scroll, setScroll] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = usePathname();
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };
  useEffect

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div
        className={`flex flex-row py-6 px-10 justify-between items-center font-poppinsRegular ${
          location === "/"
            ? scroll
              ? "bg-white text-black"
              : "text-white bg-transparent"
            : "text-black bg-white"
        }`}
      >
        <Link href="/" className="flex flex-row gap-4 text-xl items-center">
          <div className="relative">
            <Image
              src={
                  location === "/"
                    ? scroll
                      ? "/images/logo.png"
                      : "/images/logo_white.png"
                    : "/images/logo.png"
                }
                width={40}
                height={40}
              alt="logo"
            />
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
        <div className="lg:hidden">
          <button onClick={handleMenuToggle} className="text-2xl">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div
          className={`lg:hidden flex flex-col items-center text-black py-4 font-bold`}
        >
          <Link
            href="https://github.com/thedudeontitan/blepo"
            target="_blank"
            className="py-2"
          >
            Github
          </Link>
          <Link
            href="https://github.com/thedudeontitan/blepo"
            target="_blank"
            className="py-2"
          >
            Documentation
          </Link>
          <Link href="#features" className="py-2">
            Features
          </Link>
          <Link href="/" className="py-2">
            Whitepaper
          </Link>
          <Link
            href=""
            target="_blank"
            className="bg-white shadow-md hover:bg-gray-200 transition-all shadow-white text-black text-center font-poppinsThin rounded-xl px-10 py-2 text-lg mt-4 w-3/4"
          >
            Connect Wallet
          </Link>
        </div>
      )}
    </div>
  );
}
