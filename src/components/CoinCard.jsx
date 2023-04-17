import React from "react";
import { Link } from "react-router-dom";

const CoinCard = ({ id, name, img, symbol, currencySymbol = "₹", price }) => {
  return (
    <>
      <div className=" lg:w-1/6 md:w-1/4 sm:w-1/3 xs:w-1/2 p-2 w-full">
        <div className="border-2 px-2 py-4  hover:translate-y-[-4px] rounded-xl shadow-2xl">
          <Link
            to={`/coins/${id}`}
            className="block relative h-32 rounded overflow-hidden"
          >
            <img
              alt="ecommerce"
              className=" object-contain object-center w-full h-full block"
              src={img}
            />
          </Link>
          <div className="mt-4 h-28 text-center">
            <h2 className="text-gray-900 h-1/2 overflow-hidden title-font text-lg font-medium">
              {symbol}
            </h2>
            <p className="mt-1">{name}</p>
            <p className="mt-1">{price ? `${currencySymbol}${price}` : "NA"}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoinCard;
