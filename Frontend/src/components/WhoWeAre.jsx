import React from "react";
import { Zap, Lightbulb, Sparkles, Gem } from "lucide-react";

const WhoWeAre = () => {
  return (
    <section className="py-32 px-6 lg:px-20">
      <h1 className="text-center text-4xl tracking-wide text-gray-700 uppercase font-semibold">
        Who <span className="text-red-500">We</span> Are
      </h1>

      <p className="max-w-3xl mx-auto text-center text-gray-600 mt-4 leading-7">
        Trijal Electrikals Pvt. Ltd. an ISO 9001:2015 certified company based at
        Faridabad, Haryana is one of the leading manufacturer of custom built
        low tension switchgear and power distribution panels of all range and
        capacity
      </p>

      <div className="flex flex-col lg:flex-row items-center gap-14 mt-14">
        <div className="flex-1">
          <h2 className="text-5xl font-semibold text-gray-800 mb-6">
            Trijal Electrikals:
          </h2>
          <h3 className="text-3xl text-gray-800 mb-8">The "K" Essence</h3>

          <div className="space-y-8 px-10">
            <div className="flex items-start gap-4">
              <Zap className="text-green-600 mt-1" size={22} />
              <p className="text-gray-700">
                <strong>Kilowatt Power:</strong> Managing high-power electrical
                systems with expertise.
              </p>
            </div>

            <div className="flex items-start gap-4">
              <Lightbulb className="text-green-600 mt-1" size={22} />
              <p className="text-gray-700">
                <strong>Empowering Solutions:</strong> Dedication to efficient
                power distribution solutions.
              </p>
            </div>

            <div className="flex items-start gap-4">
              <Sparkles className="text-green-600 mt-1" size={22} />
              <p className="text-gray-700">
                <strong>Innovation & Expertise:</strong> Delivering
                groundbreaking solutions with innovative expertise.
              </p>
            </div>

            <div className="flex items-start gap-4">
              <Gem className="text-green-600 mt-1" size={22} />
              <p className="text-gray-700">
                <strong>Versatility & Value:</strong> Meeting diverse energy
                needs with dedication.
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <img
            src="https://trijal.com/assets/images/whoWeAre.jpg"
            alt="Team"
            className="w-full h-110 object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;
