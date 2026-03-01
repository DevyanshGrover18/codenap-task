import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-gray-100 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">

        <div>
          <img
            src="https://trijal.com/assets/icons/trijal_logo.png" 
            alt="Trijal"
            className="w-32 mb-4"
          />
          <p className="text-sm text-gray-600">
            Come Lets Go The Right Way...
          </p>
          <p className="text-sm font-semibold mt-2">
            We Work For Excellence
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Service</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="hover:text-red-600 cursor-pointer transition">
              Schneider prisma panels
            </li>
            <li className="hover:text-red-600 cursor-pointer transition">
              Power distribution panels
            </li>
            <li className="hover:text-red-600 cursor-pointer transition">
              Electrical Consultancy
            </li>
            <li className="hover:text-red-600 cursor-pointer transition">
              EPC Services
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Links</h3>
          <ul className="space-y-2 text-gray-700">
            <li
              onClick={() => navigate("/")}
              className="hover:text-red-600 cursor-pointer transition"
            >
              Home
            </li>
            <li onClick={() => navigate("/blogs")} className="hover:text-red-600 cursor-pointer transition">
              Blogs
            </li>
            <li onClick={() => navigate("/gallery")} className="hover:text-red-600 cursor-pointer transition">
              Gallery
            </li>
            <li onClick={() => navigate("/certificates")} className="hover:text-red-600 cursor-pointer transition">
              Certificates
            </li>
            <li
              onClick={() => navigate("/about")}
              className="hover:text-red-600 cursor-pointer transition"
            >
              About Us
            </li>
            <li onClick={() => navigate("/career")} className="hover:text-red-600 cursor-pointer transition">
              Career
            </li>
            <li
              onClick={() => navigate("/contact")}
              className="hover:text-red-600 cursor-pointer transition"
            >
              Contact Us
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Get in touch</h3>
          <ul className="space-y-3 text-gray-700 text-sm">
            <li>+91-8588887862, +91-8588887860</li>
            <li>sales@trijal.com</li>
            <li>contact@trijal.com</li>
            <li>
              Faridabad Office: C/o - & Work, Plot No. 5B, Sector 15-A,
              First Floor, Crown Plaza Mall, Faridabad-121007
            </li>
            <li>
              Alwar Works: F-642, Matsaya Industrial Area,
              Alwar - 301030, Rajasthan
            </li>
            <li>9:00 AM - 5:30 PM (Mon - Sat)</li>
          </ul>
        </div>
      </div>

      <div className="border-t mt-10 pt-4 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;