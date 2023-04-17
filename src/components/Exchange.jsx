import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "..";
import Loader from "./Loader";
import ErrorComponent from "./ErrorComponent";

const Exchange = () => {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${server}/exchanges`);

        setExchanges(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <ErrorComponent message={"Error While Fetching Exchange"} />;
  }

  return (
    <>
      <div className="main">
        {loading ? (
          <Loader />
        ) : (
          <>
            <section className="text-gray-600 body-font">
              <div className="container lg:px-14 px-5 py-20 mx-auto">
                <div className="flex flex-wrap -m-4">
                  {exchanges.map((currElem) => {
                    let img = currElem.image;
                    img = img.replace("small", "large");
                    return (
                      <ExchangeCard
                        key={currElem.id}
                        name={currElem.name}
                        img={img}
                        rank={currElem.trust_score_rank}
                        url={currElem.url}
                      />
                    );
                  })}
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </>
  );
};

const ExchangeCard = ({ name, img, rank, url }) => {
  return (
    <div className=" lg:w-1/6 md:w-1/4 sm:w-1/3 xs:w-1/2 p-2 w-full">
      <div className="border-2 px-2 py-4  hover:translate-y-[-4px] rounded-xl shadow-2xl">
        <a
          href={url}
          target={"blank"}
          className="block relative h-32 rounded overflow-hidden"
        >
          <img
            alt="ecommerce"
            className=" object-contain object-center w-full h-full block"
            src={img}
          />
        </a>
        <div className="mt-4 h-16 text-center">
          <h2 className="text-gray-900 h-1/2 overflow-hidden title-font text-lg font-medium">
            {name}
          </h2>
          <p className="mt-1">Rank - {rank}</p>
        </div>
      </div>
    </div>
  );
};

export default Exchange;
