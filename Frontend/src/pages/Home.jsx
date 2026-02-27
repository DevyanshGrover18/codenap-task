import React from "react";
import Navbar from "../components/Navbar";
import HomeAbout from "../components/HomeAbout";
import HomeServices from "../components/HomeServices";
import HomeProduct from "../components/HomeProducts";
import WhoWeAre from "../components/WhoWeAre";
import WhyChooseUs from "../components/WhyChooseUs";

const Home = () => {
  return (
    <div>
      <div>
        <video
          src="https://trijal.com/assets/videos/hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          style={{ width: "100%", height: "auto" }}
        />

        <HomeAbout />
        <HomeServices />
        <HomeProduct />
        <WhoWeAre />
        <h2 className="text-center text-4xl tracking-wide text-gray-700 uppercase font-semibold">
          Empowering Projects, creating{" "}
          <span className="text-red-500">excellence</span>
        </h2>
        <video
          src="https://trijal.com/assets/videos/howItWorks.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-150 object-cover"
        />
        <WhyChooseUs/>
      </div>
    </div>
  );
};

export default Home;
