/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate, useParams } from "react-router-dom";
import { useLayoutEffect } from "react";
import { CryptoContext } from "../context/CryptoContext";
import Chart from "./Chart";

const HighLowIndicator = ({ currentPrice, high, low }) => {
  const [green, setGreen] = useState();

  useEffect(() => {
    let total = high - low;
    let greenZone = ((high - currentPrice) * 100) / total;
    setGreen(Math.ceil(greenZone));
  }, [currentPrice, high, low]);

  return (
    <>
      <span
        className="bg-red h-1.5 rounded-l-lg w-[50%]"
        style={{ width: `${100 - green}%` }}
      >
        &nbsp;
      </span>
      <span
        className="bg-green h-1.5 rounded-r-lg w-[50%]"
        style={{ width: `${green}%` }}
      >
        &nbsp;
      </span>
    </>
  );
};

const CryptoDetails = () => {
  let { coinId } = useParams();
  let navigate = useNavigate();
  let { getCoinData, coinData: data, currency } = useContext(CryptoContext);

  useLayoutEffect(() => {
    getCoinData(coinId);
  }, [coinId]);

  const close = () => {
    navigate("..");
  };

  return ReactDOM.createPortal(
    <div
      className="fixed top-0 w-full h-full bg-gray-200 bg-opacity-30 first-letter:
    backdrop-blur-sm flex items-center justify-center font-nunito
    "
      onClick={close}
    >
      <div
        className="w-[65%] h-[75%] bg-gray-300 bg-opacity-75 rounded-lg text-white relative"
        onClick={(e) => e.stopPropagation()}
      >
        {data ? (
          <div className="flex items-center justify-between h-full w-full p-4">
            <div className="flex flex-col w-[45%] h-full pr-2 ">
              <div className="flex w-full items-center">
                <img
                  className="w-[3rem] h-[3rem] mx-1.5"
                  src={data.image.large}
                  alt={data.id}
                />
                <h1 className="text-xl capitalize font-medium">{data.name}</h1>
                <span
                  className="text-sm
        py-0.5 px-2.5 ml-2 bg-cyan text-cyan bg-opacity-25
        rounded uppercase
        "
                >
                  {data.symbol}
                </span>
              </div>

              <div className="flex w-full mt-6">
                <div className="flex flex-col w-full">
                  <div className="flex justify-between">
                    <span className="text-sm capitalize text-gray-100">
                      Price
                    </span>
                    <div
                      className={`text-sm px-1 ml-2 font-medium flex items-center
          rounded uppercase bg-opacity-25
          ${
            data.market_data.price_change_percentage_24h > 0
              ? "bg-green text-green"
              : "bg-red text-red"
          }
          `}
                    >
                      <span>
                        {Number(
                          data.market_data.price_change_percentage_24h
                        ).toFixed(2)}
                        %
                      </span>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`
                        w-[1rem] ml-0.5
                        ${
                          data.market_data.price_change_percentage_24h > 0
                            ? "fill-green rotate-180"
                            : "fill-red"
                        }
                        `}
                      >
                        <path d="M7.47951 11.4153C7.42599 11.493 7.35438 11.5565 7.27085 11.6004C7.18732 11.6444 7.09437 11.6673 7.00001 11.6673C6.90564 11.6673 6.81269 11.6444 6.72916 11.6004C6.64563 11.5565 6.57402 11.493 6.52051 11.4153L1.27051 3.83194C1.20974 3.74447 1.1741 3.64202 1.16747 3.53572C1.16084 3.42943 1.18346 3.32334 1.23289 3.229C1.28232 3.13466 1.35665 3.05567 1.44782 3.0006C1.53899 2.94554 1.6435 2.91652 1.75001 2.91669H12.25C12.3563 2.91713 12.4604 2.94652 12.5512 3.00172C12.642 3.05691 12.716 3.13581 12.7653 3.22993C12.8147 3.32406 12.8374 3.42984 12.8311 3.53591C12.8247 3.64199 12.7896 3.74433 12.7295 3.83194L7.47951 11.4153Z" />
                      </svg>
                    </div>
                  </div>
                  <h2 className="text-lg font-bold">
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: currency,
                      maximumSignificantDigits: 5,
                    }).format(data.market_data.current_price[currency])}
                  </h2>
                </div>
              </div>

              <div className="flex w-full mt-4 justify-between">
                <div className="flex flex-col">
                  <span className="text-sm capitalize text-gray-100">
                    Market Cap
                  </span>
                  <h2 className="text-base font-bold">
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: currency,
                      minimumFractionDigits: 0,
                    }).format(data.market_data.market_cap[currency])}
                  </h2>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm capitalize text-gray-100">
                    fully diluted valuation
                  </span>
                  <h2 className="text-base font-bold">
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: currency,
                      notation: "compact",
                    }).format(
                      data.market_data.fully_diluted_valuation[currency]
                    )}
                  </h2>
                </div>
              </div>

              <div className="flex flex-col w-full mt-4 justify-between">
                <span className="text-sm capitalize text-gray-100">
                  total volume
                </span>
                <h2 className="text-base font-bold">
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: currency,
                    minimumFractionDigits: 0,
                  }).format(data.market_data.total_volume[currency])}
                </h2>
              </div>

              <div className="flex w-full mt-4 justify-between">
                <HighLowIndicator
                  currentPrice={data.market_data.current_price[currency]}
                  high={data.market_data.high_24h[currency]}
                  low={data.market_data.low_24h[currency]}
                />
              </div>

              <div className="flex w-full mt-4 justify-between">
                <div className="flex flex-col">
                  <span className="text-sm capitalize text-gray-100">
                    Low 24H
                  </span>
                  <h2 className="text-base font-bold">
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: currency,
                      minimumFractionDigits: 5,
                    }).format(data.market_data.low_24h[currency])}
                  </h2>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm capitalize text-gray-100">
                    high 24H
                  </span>
                  <h2 className="text-base font-bold">
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: currency,
                      minimumFractionDigits: 5,
                    }).format(data.market_data.high_24h[currency])}
                  </h2>
                </div>
              </div>

              <div className="flex w-full mt-4 justify-between">
                <div className="flex flex-col">
                  <span className="text-sm capitalize text-gray-100">
                    max supply
                  </span>
                  <h2 className="text-base font-bold">
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: currency,
                      minimumFractionDigits: 0,
                    }).format(data.market_data.max_supply)}
                  </h2>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm capitalize text-gray-100">
                    circulating supply
                  </span>
                  <h2 className="text-base font-bold">
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: currency,
                      minimumFractionDigits: 0,
                    }).format(data.market_data.circulating_supply)}
                  </h2>
                </div>
              </div>

              <div className="flex w-full mt-4 justify-between">
                <div className="flex flex-col">
                  <a
                    target={"_blank"}
                    rel="noreferrer"
                    className="text-sm bg-gray-200 text-gray-100 px-1.5 py-0.5 my-1 rounded"
                    href={data?.links?.homepage[0]}
                  >
                    {data?.links?.homepage[0].substring(0, 30)}
                  </a>
                  <a
                    target={"_blank"}
                    rel="noreferrer"
                    className="text-sm bg-gray-200 text-gray-100 px-1.5 py-0.5 my-1 rounded"
                    href={data?.links?.blockchain_site[0]}
                  >
                    {data?.links?.blockchain_site[0].substring(0, 30)}
                  </a>

                  {data?.links?.official_forum_url[0] && (
                    <a
                      target={"_blank"}
                      rel="noreferrer"
                      className="text-sm bg-gray-200 text-gray-100 px-1.5 py-0.5 my-1 rounded"
                      href={data?.links?.official_forum_url[0]}
                    >
                      {data?.links?.official_forum_url[0].substring(0, 30)}
                    </a>
                  )}
                </div>

                <div className="flex flex-col content-start">
                  <span className="text-sm capitalize text-gray-100">
                    sentiment
                  </span>
                  <div className="flex justify-between">
                    <div
                      className={`text-sm px-1 ml-2 my-1 font-medium flex items-center
          rounded uppercase bg-opacity-25 bg-green text-green
          
          `}
                    >
                      <span>
                        {Number(data.sentiment_votes_up_percentage).toFixed(2)}%
                      </span>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`
                        w-[1rem] ml-0.5
                        fill-green rotate-180
                        `}
                      >
                        <path d="M7.47951 11.4153C7.42599 11.493 7.35438 11.5565 7.27085 11.6004C7.18732 11.6444 7.09437 11.6673 7.00001 11.6673C6.90564 11.6673 6.81269 11.6444 6.72916 11.6004C6.64563 11.5565 6.57402 11.493 6.52051 11.4153L1.27051 3.83194C1.20974 3.74447 1.1741 3.64202 1.16747 3.53572C1.16084 3.42943 1.18346 3.32334 1.23289 3.229C1.28232 3.13466 1.35665 3.05567 1.44782 3.0006C1.53899 2.94554 1.6435 2.91652 1.75001 2.91669H12.25C12.3563 2.91713 12.4604 2.94652 12.5512 3.00172C12.642 3.05691 12.716 3.13581 12.7653 3.22993C12.8147 3.32406 12.8374 3.42984 12.8311 3.53591C12.8247 3.64199 12.7896 3.74433 12.7295 3.83194L7.47951 11.4153Z" />
                      </svg>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <div
                      className={`text-sm px-1 ml-2 my-1 font-medium flex items-center
          rounded uppercase bg-opacity-25
           bg-red text-red
          `}
                    >
                      <span>
                        {Number(data.sentiment_votes_down_percentage).toFixed(
                          2
                        )}
                        %
                      </span>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`
                        w-[1rem] ml-0.5
              "fill-red"
                        `}
                      >
                        <path d="M7.47951 11.4153C7.42599 11.493 7.35438 11.5565 7.27085 11.6004C7.18732 11.6444 7.09437 11.6673 7.00001 11.6673C6.90564 11.6673 6.81269 11.6444 6.72916 11.6004C6.64563 11.5565 6.57402 11.493 6.52051 11.4153L1.27051 3.83194C1.20974 3.74447 1.1741 3.64202 1.16747 3.53572C1.16084 3.42943 1.18346 3.32334 1.23289 3.229C1.28232 3.13466 1.35665 3.05567 1.44782 3.0006C1.53899 2.94554 1.6435 2.91652 1.75001 2.91669H12.25C12.3563 2.91713 12.4604 2.94652 12.5512 3.00172C12.642 3.05691 12.716 3.13581 12.7653 3.22993C12.8147 3.32406 12.8374 3.42984 12.8311 3.53591C12.8247 3.64199 12.7896 3.74433 12.7295 3.83194L7.47951 11.4153Z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-[55%] h-full pl-3 ">
              <Chart id={data.id} />

              <div className="flex flex-col mt-4">
                <h3 className="text-white py-1">
                  <span className="text-gray-100 capitalize mr-1">
                    market cap rank:{" "}
                  </span>{" "}
                  {data.market_cap_rank}{" "}
                </h3>

                <h3 className="text-white py-1">
                  <span className="text-gray-100 capitalize mr-1">
                    coinGecko rank:{" "}
                  </span>{" "}
                  {data.coingecko_rank}{" "}
                </h3>

                <h3 className="text-white py-1">
                  <span className="text-gray-100 capitalize mr-1">
                    coinGecko score:{" "}
                  </span>{" "}
                  {data.coingecko_score}{" "}
                </h3>
              </div>
            </div>

            <div className="absolute bottom-8 right-8 flex items-center">
              {data.links.repos_url.github[0] && (
                <a
                  className="text-lg px-1"
                  target={"_blank"}
                  rel="noreferrer"
                  href={data.links.repos_url.github[0]}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                    style={{
                      msTransform: "rotate(360deg)",
                      WebkitTransform: "rotate(360deg)",
                      transform: "rotate(360deg)",
                    }}
                  >
                    <path
                      fill="currentColor"
                      className="fill-cyan"
                      fillRule="evenodd"
                      d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z"
                      clipRule="evenodd"
                    />
                    <path fill="rgba(0, 0, 0, 0)" d="M0 0h24v24H0z" />
                  </svg>
                </a>
              )}
              {data.links.twitter_screen_name && (
                <a
                  className="text-lg px-1"
                  target={"_blank"}
                  rel="noreferrer"
                  href={`https://twitter.com/${data.links.twitter_screen_name}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 1024 1024"
                    style={{
                      msTransform: "rotate(360deg)",
                      WebkitTransform: "rotate(360deg)",
                      transform: "rotate(360deg)",
                    }}
                  >
                    <path
                      fill="currentColor"
                      className="fill-cyan"
                      d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm215.3 337.7c.3 4.7.3 9.6.3 14.4 0 146.8-111.8 315.9-316.1 315.9-63 0-121.4-18.3-170.6-49.8 9 1 17.6 1.4 26.8 1.4 52 0 99.8-17.6 137.9-47.4-48.8-1-89.8-33-103.8-77 17.1 2.5 32.5 2.5 50.1-2a111 111 0 0 1-88.9-109v-1.4c14.7 8.3 32 13.4 50.1 14.1a111.13 111.13 0 0 1-49.5-92.4c0-20.7 5.4-39.6 15.1-56a315.28 315.28 0 0 0 229 116.1C492 353.1 548.4 292 616.2 292c32 0 60.8 13.4 81.1 35 25.1-4.7 49.1-14.1 70.5-26.7-8.3 25.7-25.7 47.4-48.8 61.1 22.4-2.4 44-8.6 64-17.3-15.1 22.2-34 41.9-55.7 57.6z"
                    />
                    <path fill="rgba(0, 0, 0, 0)" d="M0 0h1024v1024H0z" />
                  </svg>
                </a>
              )}
              {data.links.subreddit_url && (
                <a
                  className="text-lg px-1"
                  target={"_blank"}
                  rel="noreferrer"
                  href={data.links.subreddit_url}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                    style={{
                      msTransform: "rotate(360deg)",
                      WebkitTransform: "rotate(360deg)",
                      transform: "rotate(360deg)",
                    }}
                  >
                    <path
                      fill="currentColor"
                      className="fill-cyan"
                      fillRule="evenodd"
                      d="M24 12c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12Zm-4.312-.942c.194.277.304.604.316.942a1.751 1.751 0 0 1-.972 1.596c.014.176.014.352 0 .528 0 2.688-3.132 4.872-6.996 4.872-3.864 0-6.996-2.184-6.996-4.872a3.444 3.444 0 0 1 0-.528 1.75 1.75 0 1 1 1.932-2.868 8.568 8.568 0 0 1 4.68-1.476l.888-4.164a.372.372 0 0 1 .444-.288l2.94.588a1.2 1.2 0 1 1-.156.732L13.2 5.58l-.78 3.744a8.544 8.544 0 0 1 4.62 1.476 1.751 1.751 0 0 1 2.648.258ZM8.206 12.533a1.2 1.2 0 1 0 1.996 1.334 1.2 1.2 0 0 0-1.996-1.334Zm3.806 4.891c1.065.044 2.113-.234 2.964-.876a.335.335 0 1 0-.468-.48A3.936 3.936 0 0 1 12 16.8a3.924 3.924 0 0 1-2.496-.756.324.324 0 0 0-.456.456 4.608 4.608 0 0 0 2.964.924Zm2.081-3.178c.198.132.418.25.655.25a1.199 1.199 0 0 0 1.212-1.248 1.2 1.2 0 1 0-1.867.998Z"
                      clipRule="evenodd"
                    />
                    <path fill="rgba(0, 0, 0, 0)" d="M0 0h24v24H0z" />
                  </svg>
                </a>
              )}
              {data.links.facebook_username && (
                <a
                  className="text-lg px-1"
                  target={"_blank"}
                  rel="noreferrer"
                  href={`https://facebook.com/${data.links.facebook_username}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                    style={{
                      msTransform: "rotate(360deg)",
                      WebkitTransform: "rotate(360deg)",
                      transform: "rotate(360deg)",
                    }}
                  >
                    <path
                      fill="currentColor"
                      className="fill-cyan"
                      fillRule="evenodd"
                      d="M0 12.067C0 18.033 4.333 22.994 10 24v-8.667H7V12h3V9.333c0-3 1.933-4.666 4.667-4.666.866 0 1.8.133 2.666.266V8H15.8c-1.467 0-1.8.733-1.8 1.667V12h3.2l-.533 3.333H14V24c5.667-1.006 10-5.966 10-11.933C24 5.43 18.6 0 12 0S0 5.43 0 12.067Z"
                      clipRule="evenodd"
                    />
                    <path fill="rgba(0, 0, 0, 0)" d="M0 0h24v24H0z" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        ) : (
          <div
            className="w-full min-h-[60vh] h-full flex justify-center items-center
             "
          >
            <div
              className="w-8 h-8 border-4 border-cyan rounded-full
             border-b-gray-200 animate-spin 
             "
              role="status"
            />
            <span className="ml-2">please wait...</span>
          </div>
        )}
      </div>
    </div>,
    document.getElementById("model")
  );
};

export default CryptoDetails;
