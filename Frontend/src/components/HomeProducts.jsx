import React, { useState, useEffect } from "react";

const HomeProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (loading) return null;
  if (!products.length) return null;

  return (
    <section className="py-12 px-4 sm:px-8 lg:px-20">
      <h1 className="text-center text-2xl sm:text-3xl lg:text-4xl tracking-wide text-gray-600 mb-4 uppercase font-semibold">
        Products
      </h1>

      <p className="max-w-3xl mx-auto text-center text-sm sm:text-base text-gray-600 leading-7 mb-10 sm:mb-14 px-2">
        Explore our meticulously crafted range of products, designed to elevate
        your experience and meet your diverse needs. Backed by years of industry
        expertise and a commitment to quality, each product reflects our
        dedication to perfection. Discover the difference with our exceptional
        offerings.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
        {products.map((product, index) => (
          <div key={index} className="text-center group">
            <div className="overflow-hidden rounded-sm">
              <img
                src={product.img}
                alt={product.title}
                className="w-full h-56 sm:h-64 md:h-72 lg:h-80 object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <h2 className="text-base sm:text-lg font-extrabold text-blue-900 mt-5 tracking-wide">
              {product.title}
            </h2>

            <div className="w-48 sm:w-64 h-px bg-gray-400 mx-auto my-3"></div>

            <p className="text-sm sm:text-md text-gray-600 leading-6 uppercase px-2">
              {product.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HomeProduct;