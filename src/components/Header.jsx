import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { SiBitcoinsv } from "react-icons/si";
import { RiExchangeDollarLine } from "react-icons/ri";
import "./nav.css";

const Header = () => {
  const [hamb, setHamb] = useState(false);

  const hamclick = () => {
    setHamb(!hamb);
    const hamburger = document.querySelector(".hamburger");
    const navToggler = document.getElementById("navToggler");
    // console.log(navToggler);

    hamburger.classList.toggle("is-active");
    navToggler.classList.toggle("-translate-y-full");
    navToggler.classList.toggle("-z-50");
    navToggler.classList.toggle("z-10");
  };

  return (
    <>
      <MobileView hamb={hamb} hamclick={hamclick} />
      <PcView />
    </>
  );
};

const MobileView = ({ hamb, hamclick }) => {
  return (
    <>
      <header className="sticky  top-0 z-20 md:hidden">
        <nav
          className={`flex  px-5 w-full justify-between h-28 items-center bg-black`}
        >
          <div className="logo p-3">
            <NavLink
              to="/"
              className="flex title-font font-medium items-center text-gray-900 "
            >
              <img
                src="https://freepngimg.com/download/bitcoin/59699-cryptocurrency-zazzle-payment-bitcoin-logo-free-hq-image.png"
                className="w-12 h-12  rounded-full"
                alt=""
              />
              <span className="ml-3 text-white text-xl">CoinX</span>
            </NavLink>
          </div>

          <div className="hamb">
            <button
              onClick={hamclick}
              className="hamburger hamburger--spin"
              type="button"
            >
              <span className="hamburger-box">
                <span className="hamburger-inner"></span>
              </span>
            </button>
          </div>
        </nav>

        <div
          onClick={() => (hamb ? hamclick() : undefined)}
          className={`navelements w-full -top-4 relative `}
        >
          <div
            id="navToggler"
            className={`navs w-full absolute -translate-y-full -z-50  transition-all duration-300 ease-in-out pb-5 flex flex-col bg-black `}
          >
            <ul className="p-5">
              <li
                className={`flex flex-col space-y-5 text-center text-yellow-500 `}
              >
                <NavLink
                  to="/"
                  className=" tracking-wider  font-semibold text-xl flex space-x-1 items-center justify-center"
                >
                  <span>{<AiOutlineHome />}</span> <span>Home</span>
                </NavLink>
                <NavLink
                  to={"/coins"}
                  className=" tracking-wider font-semibold text-xl flex space-x-1 items-center justify-center"
                >
                  <span>{<SiBitcoinsv />}</span> <span>Coins</span>
                </NavLink>
                <NavLink
                  to="/exchanges"
                  className=" tracking-wider font-semibold text-xl flex space-x-1 items-center justify-center"
                >
                  <span>{<RiExchangeDollarLine />}</span> <span>Exchanges</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </header>
    </>
  );
};

const PcView = () => {
  return (
    <>
      <header className="sticky top-0 z-20 hidden md:block">
        <nav
          className={`flex stroke  px-7 lg:px-10 w-full h-28 justify-between items-center bg-black`}
        >
          <div className="logo p-3">
            <NavLink
              to="/"
              className="flex title-font font-medium items-center text-gray-900 "
            >
              <img
                src="https://freepngimg.com/download/bitcoin/59699-cryptocurrency-zazzle-payment-bitcoin-logo-free-hq-image.png"
                className="w-12 h-12  rounded-full"
                alt=""
              />
              <span className="ml-3 text-white text-xl">CoinX</span>
            </NavLink>
          </div>
          <div
            className={`navs text-lg font-semibold items-center px-5 flex space-x-7 text-white`}
          >
            <ul className="flex space-x-7">
              <li>
                <NavLink
                  to={"/"}
                  className=" pb-1 flex space-x-1 items-center rounded-b-sm  hover:text-yellow-500"
                >
                  {({ isActive }) => (
                    <span
                      className={
                        isActive
                          ? "border-b-2 pb-1  border-yellow-500 text-yellow-500"
                          : undefined
                      }
                    >
                      <span className="flex space-x-1 items-center rounded-b-sm ">
                        <span>{<AiOutlineHome />}</span> <span>Home</span>
                      </span>
                    </span>
                  )}
                </NavLink>
              </li>

              <li>
                <NavLink
                  to={"/coins"}
                  className=" pb-1 flex space-x-1 items-center rounded-b-sm  hover:text-yellow-500"
                >
                  {({ isActive }) => (
                    <span
                      className={
                        isActive
                          ? "border-b-2 pb-1  border-yellow-500 text-yellow-500"
                          : undefined
                      }
                    >
                      <span className="flex space-x-1 items-center rounded-b-sm ">
                        <span>{<SiBitcoinsv />}</span> <span>Coins</span>
                      </span>
                    </span>
                  )}
                </NavLink>
              </li>

              <li>
                <NavLink
                  to={"/exchanges"}
                  className=" pb-1 flex space-x-1 items-center rounded-b-sm  hover:text-yellow-500"
                >
                  {({ isActive }) => (
                    <span
                      className={
                        isActive
                          ? "border-b-2 pb-1  border-yellow-500 text-yellow-500"
                          : undefined
                      }
                    >
                      <span className="flex space-x-1 items-center rounded-b-sm ">
                        <span>{<RiExchangeDollarLine />}</span>{" "}
                        <span>Exchanges</span>
                      </span>
                    </span>
                  )}
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
