import React, { useEffect, useState } from "react";

const HomeServices = () => {
  const [services, setServices] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    fetch("http://localhost:5000/api/get-services")
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch((err) => console.log(err));
  }, []);

  if (!services.length) return null;

  const activeService = services[activeIndex];

  return (
    <section className="py-12 px-4 sm:px-8 lg:px-20">
      <h1 className="text-center text-xl sm:text-2xl lg:text-4xl tracking-wider text-gray-600 mb-8 sm:mb-10 uppercase px-0 sm:px-12 lg:px-36 font-bold leading-snug">
        Innovative Technologies Services to Energize Society
      </h1>

      <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-3 sm:gap-6 mb-10 sm:mb-12">
        {services.map((service, index) => (
          <button
            key={service._id}
            onClick={() => setActiveIndex(index)}
            className={`px-4 sm:px-6 py-2 border-2 transition-all duration-300 font-semibold text-sm sm:text-base w-full sm:w-auto ${
              activeIndex === index
                ? "bg-green-600 text-white border-green-600"
                : "bg-white text-black border-black hover:bg-gray-100"
            }`}
          >
            {service.title}
          </button>
        ))}
      </div>

      <div
        key={activeIndex}
        className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12 animate-fadeIn"
      >
        <div className="w-full lg:flex-1 flex justify-center">
          <img
            src={activeService.img}
            alt={activeService.title}
            className="w-full max-w-sm sm:max-w-md lg:max-w-full lg:max-h-96 object-contain transition-all duration-500"
          />
        </div>

        <div className="w-full lg:flex-1 text-center lg:text-left">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">
            {activeService.title}
          </h2>

          <p className="text-gray-700 text-sm sm:text-base leading-7 sm:leading-8 mb-6 sm:mb-8 whitespace-pre-line">
            {activeService.desc}
          </p>

          <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded text-sm sm:text-base w-full sm:w-auto">
            Explore
          </button>
        </div>
      </div>
    </section>
  );
};

export default HomeServices;
