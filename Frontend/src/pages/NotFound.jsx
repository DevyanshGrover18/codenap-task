import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const pathName = location.pathname.replace("/", "");
  const pageName =
    pathName.charAt(0).toUpperCase() + pathName.slice(1);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-6">
      
      <h1 className="text-6xl font-bold text-red-600 mb-6">
        Oops!
      </h1>

      <p className="text-xl text-gray-700 mb-6">
        We are still building{" "}
        <span className="font-semibold text-black">
          {pageName || "this"}
        </span>{" "}
        page.
      </p>

      <button
        onClick={() => navigate("/")}
        className="bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700 transition"
      >
        Go Back Home
      </button>
    </div>
  );
};

export default NotFound;