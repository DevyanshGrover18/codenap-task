import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const currentPage = location.pathname.replace("/", "");

  const handleClick = (pg) => {
    navigate(`/${pg}`);
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navLinks = [
    { label: "Home", path: "" },
    { label: "About Us", path: "about" },
    { label: "Products & Services", path: "products" },
    { label: "Gallery", path: "gallery" },
    { label: "Career", path: "career" },
    { label: "Contact", path: "contact" },
  ];

  return (
    <nav id="Navbar" className="bg-white shadow-sm relative z-50">
      <div className="h-16 flex items-center justify-between px-4 md:px-8">
        <div>
          <img
            src="https://trijal.com/assets/icons/trijal_logo.png"
            alt="logo"
            className="h-14"
          />
        </div>

        <ul className="hidden md:flex gap-8 font-normal text-sm">
          {navLinks.map(({ label, path }) => (
            <li
              key={path}
              onClick={() => handleClick(path)}
              className={`cursor-pointer transition-colors duration-200 hover:text-red-500 ${
                currentPage === path
                  ? "text-red-500 font-medium"
                  : "text-slate-700"
              }`}
            >
              {label}
            </li>
          ))}
        </ul>

        <button
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 focus:outline-none"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <span
            className={`block h-0.5 w-6 bg-slate-700 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`block h-0.5 w-6 bg-slate-700 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-0.5 w-6 bg-slate-700 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-96 border-t border-slate-100" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col px-4 py-2">
          {navLinks.map(({ label, path }) => (
            <li
              key={path}
              onClick={() => handleClick(path)}
              className={`cursor-pointer py-3 text-sm border-b border-slate-100 last:border-0 transition-colors duration-200 hover:text-red-500 ${
                currentPage === path
                  ? "text-red-500 font-medium"
                  : "text-slate-700"
              }`}
            >
              {label}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
