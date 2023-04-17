import {
  Badge,
  HStack,
  Text,
  Progress,
  VStack,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "..";
import ErrorComponent from "./ErrorComponent";
import Loader from "./Loader";
import { Radio } from "./Coins";
import Chart from "./Chart";

const CoinDetails = () => {
  const [coin, setCoin] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState("inr");
  const [days, setDays] = useState("24h");
  const [chartArray, setChartArray] = useState([]);

  const { id } = useParams();

  const btns = ["24h", "7d", "14d", "30d", "60d", "200d", "1y", "max"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${id}`);

        const { data: chartData } = await axios.get(
          `${server}/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`
        );
        // console.log(chartData);
        setCoin(data);
        setChartArray(chartData.prices);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };

    fetchData();
  }, [id, currency, days]);

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";
  const switchChartStats = (key) => {
    switch (key) {
      case "24h":
        setDays("24h");
        setLoading(true);
        break;
      case "7d":
        setDays("7d");
        setLoading(true);
        break;
      case "14d":
        setDays("14d");
        setLoading(true);
        break;
      case "30d":
        setDays("30d");
        setLoading(true);
        break;
      case "60d":
        setDays("60d");
        setLoading(true);
        break;
      case "200d":
        setDays("200d");
        setLoading(true);
        break;
      case "1y":
        setDays("365d");
        setLoading(true);
        break;
      case "max":
        setDays("max");
        setLoading(true);
        break;

      default:
        setDays("24h");
        setLoading(true);
        break;
    }
  };

  if (error) {
    return <ErrorComponent message={"Error While Fetching Coin"} />;
  }

  return (
    <>
      <div className="main">
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="px-10  md:px-20">
              <Radio setCurrency={setCurrency} />
            </div>
            <div className=" p-10 md:px-20 md:py-14">
              <div className="charts my-7">
                <Chart arr={chartArray} currency={currencySymbol} days={days} />
              </div>

              <div className="btns">
                <HStack p="4" overflowX={"auto"}>
                  {btns.map((curr) => {
                    return (
                      <Button
                        // my={3}
                        key={curr}
                        onClick={() => switchChartStats(curr)}
                      >
                        {curr}
                      </Button>
                    );
                  })}
                </HStack>
              </div>

              <p className="text-center mt-5 opacity-70">
                Last Upadated on{" "}
                {Date(coin.market_data.last_updated).split("G")[0]}
              </p>
              <div className="box p-5 flex items-center md:items-start flex-col">
                <img
                  src={coin.image.large}
                  className="object-contain w-24 h-24 md:w-32 md:h-32"
                  alt="img"
                />

                <div className="box1">
                  <div className="name text-xl font-semibold">{coin.name}</div>
                  <div className="price">
                    {currencySymbol}
                    {coin.market_data.current_price[currency]}
                  </div>
                </div>

                <div>
                  <i
                    className={`fa-solid ${
                      coin.market_data.price_change_percentage_24h > 0
                        ? "fa-caret-up text-green-600"
                        : "fa-caret-down text-red-600"
                    } space-x-2`}
                  >
                    <span className="ml-2 text-xs">
                      {coin.market_data.price_change_percentage_24h} %
                    </span>
                  </i>
                </div>

                <div className="rank">
                  <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                    {`#${coin.market_cap_rank}`}
                  </span>
                </div>
              </div>

              <Custombar
                high={`${currencySymbol} ${coin.market_data.high_24h[currency]}`}
                low={`${currencySymbol} ${coin.market_data.low_24h[currency]}`}
              />

              <div className="box2">
                <Item
                  title={"Max Supply"}
                  value={coin.market_data.max_supply}
                />
                <Item
                  title={"Circulating Supply"}
                  value={coin.market_data.circulating_supply}
                />
                <Item
                  title={"Market Cap"}
                  value={`${currencySymbol}${coin.market_data.market_cap[currency]}`}
                />
                <Item
                  title={"All Time Low"}
                  value={`${currencySymbol}${coin.market_data.atl[currency]}`}
                />
                <Item
                  title={"All Time High"}
                  value={`${currencySymbol}${coin.market_data.ath[currency]}`}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

const Item = ({ title, value }) => {
  return (
    <>
      <HStack justifyContent={"space-between"} w={"full"} my={"4"}>
        <Text fontFamily={"Bebas Neue"} letterSpacing={"widest"}>
          {title}
        </Text>
        <Text>{value}</Text>
      </HStack>
    </>
  );
};

const Custombar = ({ high, low }) => {
  return (
    <>
      <VStack>
        <Progress value={50} colorScheme={"teal"} w={"full"} />
        <HStack justifyContent={"space-between"} w={"full"}>
          <Badge children={low} colorScheme={"red"} />
          <Text fontSize={"sm"}>24h Range</Text>
          <Badge children={high} colorScheme={"green"} />
        </HStack>
      </VStack>
    </>
  );
};

export default CoinDetails;
