import React, { useState, useEffect } from "react";

const images = [
  "https://trijal.com/assets/images/aboutSlider/1.jpg",
  "https://trijal.com/assets/images/aboutSlider/2.jpg",
  "https://trijal.com/assets/images/aboutSlider/3.jpg",
  "https://trijal.com/assets/images/aboutSlider/4.jpg",
  "https://trijal.com/assets/images/aboutSlider/5.jpg",
];

const HomeAbout = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 px-6 lg:px-20">
      <h1 className="text-center text-4xl font-semibold text-gray-600 mb-12">
        ABOUT US
      </h1>

      <div className="flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1">
          <h2 className="text-2xl font-semibold mb-6">
            Delivering Precision, Quality, and Expertise to Illuminate Your
            Vision.
          </h2>

          <p className="text-gray-700 leading-8 mb-8">
            Trijal Electrikals Pvt. Ltd., headquartered in Faridabad, Haryana,
            and certified with ISO 9001:2015 accreditation. Specializing in
            custom-built power distribution panels and low tension switchgear,
            we ensure punctual delivery of top-tier products crafted with
            cutting-edge machinery. Under Mr. Som Sharma's leadership with 30+
            years of expertise, we provide dependable electrical solutions
            including Manufacturing, Design & Engineering, and Erection &
            Commissioning services.
          </p>

          <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded">
            Read More
          </button>
        </div>

        <div className="flex-1 relative w-full">
          <img
            src={images[current]}
            alt="About"
            className="w-full h-105 object-cover"
          />

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
      </div>
    </section>
  );
};

export default HomeAbout;
