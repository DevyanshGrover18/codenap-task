import React from "react";
import { Cpu, BadgeCheck, Leaf, Headphones } from "lucide-react";

const WhyChooseUs = () => {
  return (
    <section className="relative py-20 px-6 lg:px-20 overflow-hidden">

      <div className="absolute inset-0">
        <img
          src="https://trijal.com/assets/images/why1.png"
          alt="bg"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-green-900/50"></div>
      </div>

      <div className="relative z-10 text-center text-white">

        <h1 className="text-4xl tracking-wide uppercase mb-6">
          Why Choose <span className="text-red-500">Us</span>
        </h1>

        <p className="max-w-3xl mx-auto mb-16 text-lg text-gray-200">
          At Trijal Electrikals our unparalleled expertise in electrical panels
          sets us apart, making us the top choice for those seeking exceptional
          quality and reliability.
        </p>

        <div className="grid md:grid-cols-4 gap-8">

          <div className="glass-card animate-slideLeft delay-100">
            <Cpu className="text-green-400 mx-auto mb-4" size={36} />
            <h3 className="text-xl font-semibold mb-2">Smart Technology</h3>
            <p className="text-gray-200">
              Smart technology integration for efficient solutions
            </p>
          </div>

          <div className="glass-card animate-slideLeft delay-300">
            <BadgeCheck className="text-green-400 mx-auto mb-4" size={36} />
            <h3 className="text-xl font-semibold mb-2">Certified Expert</h3>
            <p className="text-gray-200">
              Certified experts ensuring quality and reliability
            </p>
          </div>

          <div className="glass-card animate-slideLeft delay-500">
            <Leaf className="text-green-400 mx-auto mb-4" size={36} />
            <h3 className="text-xl font-semibold mb-2">Eco Technology</h3>
            <p className="text-gray-200">
              Eco-friendly technology for sustainable practices
            </p>
          </div>

          <div className="glass-card animate-slideLeft delay-700">
            <Headphones className="text-green-400 mx-auto mb-4" size={36} />
            <h3 className="text-xl font-semibold mb-2">Accessibility</h3>
            <p className="text-gray-200">
              24/7 support ensuring continuous assistance and peace of mind
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;