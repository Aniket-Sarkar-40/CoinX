import React from "react";
import { Link } from "react-router-dom";
import errorImg from "../Assets/error.png";
import "./error.css";

const Error = () => {
  return (
    <>
      <div className=" lg:px-12">
        <section className="text-gray-600 body-font">
          <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
            <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
              <h1 className="title-font sm:text-5xl text-3xl mb-4 font-medium text-gray-900">
                404! Error Page
              </h1>
              <p className="mb-8 text-lg leading-relaxed">Page not found.</p>
              <div className="flex justify-center">
                <Link to={"/"}>
                  <button className="btnstyl hover:text-white">
                    Go to Home Page
                  </button>
                </Link>
              </div>
            </div>
            <div className="image lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
              <img
                className="object-cover  object-center rounded"
                alt="hero"
                src={errorImg}
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Error;
