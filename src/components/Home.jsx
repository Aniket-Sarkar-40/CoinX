import React from "react";
import "./comp.css";

const Home = () => {
  return (
    <>
      <div className="main  background">
        <div className="w-full pb-16  h-[87vh] sm:h-[100vh]">
          <img
            className="rotate-vert-center w-full h-[90%] object-contain"
            src="images/btc.png"
            alt=""
          />
          <div className="flex absolute justify-center w-full">
            <p className="relative text-center  text-white text-5xl md:text-6xl font-semibold bottom-14 sm:bottom-5 text-pop-up-top tracking-in-contract-bck ">
              <span>Welcome to</span>
              <br />
              CoinX
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
