import React, { useState, useEffect } from "react";
import HomeProduct from "../components/HomeProducts";
import HomeServices from "../components/HomeServices";

const images = [
  "https://trijal.com/assets/images/banners/1.jpg",
  "https://trijal.com/assets/images/banners/2.jpg",
  "https://trijal.com/assets/images/banners/3.jpg",
  "https://trijal.com/assets/images/banners/4.jpg",
  "https://trijal.com/assets/images/banners/5.jpg",
];

const ProductsAndServices = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);


  return (
    <div>
      <div className="flex-1 relative w-full">
        <img
          src={images[current]}
          alt="About"
          className="w-full h-105 object-cover"
        />
        <h1 className="absolute inset-0 flex items-center uppercase justify-center text-4xl text-white font-semibold text_shadow">
          Products & Services
        </h1>

        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3">
          {images.map((_, index) => (
            <span
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-8 h-1 rounded-full cursor-pointer ${
                current === index ? "bg-white" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
      <HomeProduct />
      <HomeServices />
    </div>
  );
};

export default ProductsAndServices;
