import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CryptoContext } from "./../context/CryptoContext";
import Pagination from "./Pagination";
import { StorageContext } from "./../context/StorageContext";

const SaveBtn = ({ data }) => {
  const { saveCoin, allCoins, removeCoin } = useContext(StorageContext);

  const handleClick = (e) => {
    e.preventDefault();
    saveCoin(data.id);

    if (allCoins.includes(data.id)) {
      removeCoin(data.id);
    } else {
      saveCoin(data.id);
    }
  };

  return (
    <button
      className="outline-0 border-0 bg-none cursor-pointer"
      onClick={(e) => handleClick(e)}
    >
      <svg
        className={`w-[1.5rem] ml-1.5 
                      ${
                        allCoins.includes(data.id)
                          ? "fill-cyan"
                          : "fill-gray-100"
                      }
                       hover:fill-cyan`}
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="cyan"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_16_420)">
          <path d="M22.6583 28.3333C22.2901 28.333 21.9303 28.2227 21.625 28.0167L15.4083 23.85C15.3777 23.8289 15.3414 23.8175 15.3042 23.8175C15.267 23.8175 15.2306 23.8289 15.2 23.85L8.98334 28.0167C8.67117 28.2251 8.30297 28.3337 7.92765 28.3279C7.55233 28.3221 7.18764 28.2023 6.88201 27.9844C6.57637 27.7665 6.34426 27.4608 6.2165 27.1078C6.08873 26.7549 6.07135 26.3714 6.16667 26.0083L8.20834 18.8083C8.21799 18.7721 8.21682 18.7339 8.20497 18.6983C8.19312 18.6628 8.17112 18.6315 8.14167 18.6083L2.25834 13.9833C1.94862 13.7526 1.71888 13.4307 1.60133 13.0628C1.48377 12.6949 1.48431 12.2995 1.60285 11.9319C1.72139 11.5644 1.952 11.2431 2.26233 11.0132C2.57267 10.7833 2.94718 10.6563 3.33334 10.65L10.8333 10.3667C10.8702 10.3641 10.9056 10.351 10.9351 10.3288C10.9647 10.3066 10.9872 10.2764 11 10.2417L13.5833 3.21666C13.7136 2.86053 13.9501 2.55301 14.2608 2.33574C14.5716 2.11848 14.9416 2.00195 15.3208 2.00195C15.7 2.00195 16.0701 2.11848 16.3808 2.33574C16.6916 2.55301 16.9281 2.86053 17.0583 3.21666L19.6417 10.2417C19.6544 10.2764 19.677 10.3066 19.7065 10.3288C19.7361 10.351 19.7715 10.3641 19.8083 10.3667L27.3083 10.65C27.6945 10.6563 28.069 10.7833 28.3793 11.0132C28.6897 11.2431 28.9203 11.5644 29.0388 11.9319C29.1574 12.2995 29.1579 12.6949 29.0403 13.0628C28.9228 13.4307 28.6931 13.7526 28.3833 13.9833L22.5 18.6083C22.4697 18.6308 22.447 18.662 22.435 18.6978C22.4231 18.7336 22.4225 18.7722 22.4333 18.8083L24.475 26.0083C24.5467 26.2845 24.5538 26.5735 24.4958 26.8528C24.4378 27.1322 24.3162 27.3944 24.1406 27.6193C23.9649 27.8441 23.7398 28.0254 23.4828 28.1493C23.2257 28.2731 22.9436 28.3361 22.6583 28.3333ZM15.3083 22.15C15.6774 22.1613 16.0345 22.2832 16.3333 22.5L22.55 26.6667C22.5815 26.6906 22.6199 26.7037 22.6595 26.704C22.6991 26.7043 22.7377 26.6918 22.7695 26.6684C22.8014 26.645 22.8249 26.6118 22.8364 26.574C22.8479 26.5361 22.8468 26.4955 22.8333 26.4583L20.7917 19.2583C20.6912 18.9051 20.6986 18.53 20.813 18.181C20.9273 17.8321 21.1433 17.5253 21.4333 17.3L27.3167 12.675C27.3488 12.6525 27.3728 12.6202 27.3852 12.583C27.3976 12.5458 27.3978 12.5056 27.3857 12.4683C27.3735 12.431 27.3498 12.3986 27.3179 12.3758C27.2859 12.353 27.2476 12.341 27.2083 12.3417L19.7083 12.0583C19.3411 12.044 18.9865 11.9206 18.6896 11.704C18.3928 11.4873 18.1672 11.1871 18.0417 10.8417L15.4583 3.81666C15.4467 3.77936 15.4234 3.74676 15.392 3.72361C15.3605 3.70046 15.3224 3.68797 15.2833 3.68797C15.2443 3.68797 15.2062 3.70046 15.1747 3.72361C15.1432 3.74676 15.12 3.77936 15.1083 3.81666L12.55 10.8333C12.4245 11.1787 12.1989 11.4789 11.9021 11.6956C11.6052 11.9123 11.2506 12.0357 10.8833 12.05L3.38334 12.3333C3.34412 12.3327 3.30574 12.3447 3.27383 12.3674C3.24191 12.3902 3.21815 12.4227 3.20602 12.46C3.1939 12.4973 3.19406 12.5375 3.20648 12.5747C3.21889 12.6119 3.24291 12.6441 3.27501 12.6667L9.16667 17.3C9.45579 17.526 9.67117 17.8328 9.78543 18.1815C9.89969 18.5303 9.90767 18.9051 9.80834 19.2583L7.77501 26.4583C7.76287 26.4944 7.76281 26.5334 7.77484 26.5695C7.78687 26.6056 7.81033 26.6368 7.84167 26.6583C7.87186 26.6842 7.91028 26.6983 7.95001 26.6983C7.98973 26.6983 8.02815 26.6842 8.05834 26.6583L14.275 22.4917C14.5788 22.2901 14.9354 22.1829 15.3 22.1833L15.3083 22.15Z" />
        </g>
        <defs>
          <clipPath id="clip0_16_420">
            <rect width="30" height="30" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </button>
  );
};

const TableComponent = () => {
  let { cryptoData, currency,error } = useContext(CryptoContext);

  return (
    <>
      <div className="flex flex-col mt-9 border border-gray-100 rounded">
        {cryptoData ? (
          <table className="w-full table-auto">
            <thead
              className="capitalize text-base text-gray-100 
            font-medium border-b border-gray-100
            "
            >
              <tr>
                <th className="py-1">asset</th>
                <th className="py-1">name</th>
                <th className="py-1">price</th>
                <th className="py-1">total volume</th>
                <th className="py-1">market cap change</th>
                <th className="py-1 lg:table-cell hidden">1H</th>
                <th className="py-1 lg:table-cell hidden">24H</th>
                <th className="py-1 lg:table-cell hidden">7D</th>
              </tr>
            </thead>
            <tbody>
              {cryptoData.map((data) => {
                return (
                  <tr
                    key={data.id}
                    className="text-center text-base border-b border-gray-100 
            hover:bg-gray-200 last:border-b-0
            "
                  >
                    <td className="py-4 flex items-center uppercase">
                      <SaveBtn data={data} />
                      <img
                        className="w-[1.2rem] h-[1.2rem] mx-1.5"
                        src={data.image}
                        alt={data.name}
                      />
                      <span>
                        <Link to={`/${data.id}`} className="cursor-pointer">
                          {data.symbol}
                        </Link>
                      </span>
                    </td>
                    <td className="py-4">
                      <Link to={`/${data.id}`} className="cursor-pointer">
                        {data.name}
                      </Link>
                    </td>
                    <td className="py-4">
                      {new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: currency,
                      }).format(data.current_price)}
                    </td>
                    <td className="py-4">{data.total_volume}</td>
                    <td className="py-4">
                      {data.market_cap_change_percentage_24h}%
                    </td>
                    <td
                      className={
                        data.price_change_percentage_1h_in_currency > 0
                          ? "text-green py-4 lg:table-cell hidden "
                          : "text-red py-4  lg:table-cell hidden"
                      }
                    >
                      {Number(
                        data.price_change_percentage_1h_in_currency
                      ).toFixed(2)}
                    </td>
                    <td
                      className={
                        data.price_change_percentage_24h_in_currency > 0
                          ? "text-green py-4 lg:table-cell hidden"
                          : "text-red py-4  lg:table-cell hidden"
                      }
                    >
                      {Number(
                        data.price_change_percentage_24h_in_currency
                      ).toFixed(2)}
                    </td>
                    <td
                      className={
                        data.price_change_percentage_7d_in_currency > 0
                          ? "text-green py-4 lg:table-cell hidden"
                          : "text-red py-4  lg:table-cell hidden"
                      }
                    >
                      {Number(
                        data.price_change_percentage_7d_in_currency
                      ).toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (!error.data && !error.search) ? (
          <div className="w-full min-h-[50vh] flex justify-center items-center">
            <div
              className="w-8 h-8 border-4 border-solid border-cyan rounded-full border-b-gray-200 animate-spin"
              role="status"
            />
            <span className="text-base ml-2">please wait...</span>
          </div>
        ) : error.data || error.search ? (
          <h1 className="min-h-[60vh] text-lg text-red flex items-center justify-center ">
            {error.data
              ? error.data
              : error.search
              ? error.search
              : "Something unexpected happened!"}
              {/* Here we have use multi chain conditions using ternary operator/ this is not
              covered in the video but for the example and some improvements */}
          </h1>
        ) : null}
      </div>
      <div className="flex items-center justify-between mt-4 capitalize h-[2rem]">
        <span>
          Data provided by{" "}
          <a
            className="text-cyan"
            href="http://www.coingecko.com"
            rel="noreferrer"
            target={"_blank"}
          >
            CoinGecko
          </a>
        </span>
        <Pagination />
      </div>
    </>
  );
};

export default TableComponent;
