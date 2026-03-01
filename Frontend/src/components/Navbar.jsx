import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const currentPage = location.pathname.replace("/", "");

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, [location]);

  const handleClick = (pg) => {
    navigate(`/${pg}`);
    setMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/");
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

        <div className="hidden md:flex items-center gap-3">
          {isLoggedIn ? (
            <>
              <button
                onClick={() => navigate("/admin")}
                className="text-sm font-medium text-red-600 border border-red-200 px-4 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
              >
                Dashboard
              </button>
              <button
                onClick={handleLogout}
                className="text-sm font-medium text-white bg-red-600 px-4 py-1.5 rounded-lg hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="text-sm font-medium text-white bg-red-600 px-4 py-1.5 rounded-lg hover:bg-red-700 transition-colors"
            >
              Admin Login
            </button>
          )}
        </div>

        <button
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 focus:outline-none"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <span className={`block h-0.5 w-6 bg-slate-700 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block h-0.5 w-6 bg-slate-700 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-6 bg-slate-700 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-screen border-t border-slate-100" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col px-4 py-2">
          {navLinks.map(({ label, path }) => (
            <li
              key={path}
              onClick={() => handleClick(path)}
              className={`cursor-pointer py-3 text-sm border-b border-slate-100 transition-colors duration-200 hover:text-red-500 ${
                currentPage === path
                  ? "text-red-500 font-medium"
                  : "text-slate-700"
              }`}
            >
              {label}
            </li>
          ))}

          {/* Mobile auth buttons */}
          {isLoggedIn ? (
            <>
              <li
                onClick={() => { navigate("/admin"); setMenuOpen(false); }}
                className="cursor-pointer py-3 text-sm text-red-600 font-medium border-b border-slate-100 hover:text-red-700 transition-colors"
              >
                Dashboard
              </li>
              <li
                onClick={handleLogout}
                className="cursor-pointer py-3 text-sm text-red-600 font-medium hover:text-red-700 transition-colors"
              >
                Logout
              </li>
            </>
          ) : (
            <li
              onClick={() => { navigate("/login"); setMenuOpen(false); }}
              className="cursor-pointer py-3 text-sm text-red-600 font-medium hover:text-red-700 transition-colors"
            >
              Admin Login
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;