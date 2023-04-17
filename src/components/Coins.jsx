import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "..";
import Loader from "./Loader";
import ErrorComponent from "./ErrorComponent";
import CoinCard from "./CoinCard";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";

const Coins = () => {
  const [coin, setCoin] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("inr");
  const [index, setIndex] = useState(1);

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const changePage = (pno) => {
    setPage(pno);
    setLoading(true);
  };

  const nextPageEvent = () => {
    if (index < 122) {
      setIndex(index + 1);
    }
  };

  const prevPageEvent = () => {
    if (index > 1) {
      setIndex(index - 1);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `${server}/coins/markets?vs_currency=${currency}&page=${page}`
        );

        setCoin(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };

    fetchData();
  }, [currency, page]);

  if (error) {
    return <ErrorComponent message={"Error While Fetching Coins"} />;
  }

  return (
    <>
      <div className="main">
        {loading ? (
          <Loader />
        ) : (
          <>
            <Radio setCurrency={setCurrency} />

            <section className="text-gray-600 body-font">
              <div className="container lg:px-14 px-5 py-20 mx-auto">
                <div className="flex flex-wrap -m-4">
                  {coin.map((currElem) => {
                    return (
                      <CoinCard
                        key={currElem.id}
                        id={currElem.id}
                        name={currElem.name}
                        img={currElem.image}
                        symbol={currElem.symbol}
                        price={currElem.current_price}
                        currencySymbol={currencySymbol}
                      />
                    );
                  })}
                </div>
              </div>
            </section>

            {/* pagination */}

            {/* <div className="w-full h-24 items-center flex lg:px-14 px-5 overflow-x-scroll">
              <div className="flex space-x-5 w-10">
                {pages.map((curr, index) => {
                  return (
                    <button
                      key={index + 1}
                      onClick={() => changePage(index + 1)}
                      className="rounded-full border-2 px-4 py-2 bg-black text-white"
                    >
                      {index + 1}
                    </button>
                  );
                })}
              </div>
            </div> */}

            <div className="w-full px-5 h-24 flex justify-center items-center gap-5">
              <button
                onClick={prevPageEvent}
                className="px-4 flex gap-2 items-center rounded-xl py-3 hover:bg-slate-900 bg-black text-white"
              >
                <AiOutlineDoubleLeft /> Prev
              </button>

              <div className="pages overflow-x-hidden h-full py-3 w-fit px-5 flex justify-center items-center gap-1 xs:gap-5">
                <button
                  onClick={() => changePage(index)}
                  className=" py-3 rounded-full px-5 hover:bg-slate-900 bg-black text-white"
                >
                  {index}
                </button>
                <button
                  onClick={() => changePage(index + 1)}
                  className=" py-3 hidden sm:inline-block hover:bg-slate-900 rounded-full px-5 bg-black text-white"
                >
                  {index + 1}
                </button>
                <span className="hidden xs:inline">.....</span>
                <button
                  onClick={() => changePage(124)}
                  className=" py-3 hidden xs:inline-block hover:bg-slate-900 rounded-full px-5 bg-black text-white"
                >
                  {124}
                </button>
              </div>
              <button
                onClick={nextPageEvent}
                className="px-4 flex gap-2 items-center rounded-xl py-3 hover:bg-slate-900 bg-black text-white"
              >
                Next <AiOutlineDoubleRight />
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

const Radio = ({ setCurrency }) => {
  return (
    <>
      <div className="px-5 lg:px-16">
        <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
          Identification
        </h3>

        <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
            <div className="flex items-center pl-3">
              <input
                id="horizontal-list-radio-license"
                type="radio"
                value=""
                name="list-radio"
                onChange={() => setCurrency("inr")}
                className="w-4 h-4 outline-none text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              />
              <label
                htmlFor="horizontal-list-radio-license"
                className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                INR
              </label>
            </div>
          </li>
          <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
            <div className="flex items-center pl-3">
              <input
                id="horizontal-list-radio-id"
                type="radio"
                value=""
                onChange={() => setCurrency("usd")}
                name="list-radio"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              />
              <label
                htmlFor="horizontal-list-radio-id"
                className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                USD
              </label>
            </div>
          </li>
          <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
            <div className="flex items-center pl-3">
              <input
                id="horizontal-list-radio-millitary"
                type="radio"
                value=""
                onChange={() => setCurrency("eur")}
                name="list-radio"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              />
              <label
                htmlFor="horizontal-list-radio-millitary"
                className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                EUR
              </label>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Coins;
export { Radio };
