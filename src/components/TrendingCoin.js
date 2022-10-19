import React from "react";
import { useNavigate } from "react-router-dom";

const TrendingCoin = ({ data }) => {
  let navigate = useNavigate();

  const getCoinDetails = (id) => {
    navigate(`${id}`);
  };

  return (
    <div
      className="w-[40%] bg-gray-200 mb-12
    last:mb-0 rounded-lg p-4 relative cursor-pointer
    hover:bg-gray-100 hover:bg-opacity-40
    "
      onClick={() => getCoinDetails(data.id)}
    >
      {data ? (
        <>
          <h3 className="txt-base flex items-center my-0.5">
            <span className="text-gray-100 capitalize">name:&nbsp;</span>
            <span className="text-cyan">{data.name}</span>
            <img
              src={data.small}
              alt={data.name}
              className="w-[1.5rem] h-[1.5rem] mx-1.5 rounded-full"
            />
          </h3>

          <h3 className="txt-base flex items-center my-0.5">
            <span className="text-gray-100 capitalize">
              market cap rank:&nbsp;
            </span>
            <span className="text-cyan">{data.market_cap_rank}</span>
          </h3>
          <h3 className="txt-base flex items-center my-0.5">
            <span className="text-gray-100 capitalize">
              price (in btc):&nbsp;
            </span>
            <span className="text-cyan">
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "btc",
                maximumSignificantDigits: 5,
              }).format(data.price_btc)}
            </span>
          </h3>

          <h3 className="txt-base flex items-center my-0.5">
            <span className="text-gray-100 capitalize">score:&nbsp;</span>
            <span className="text-cyan">{data.score}</span>
          </h3>

          <img
            src={data.large}
            alt={data.name}
            className="w-[35%] h-auto rounded-full absolute top-2/4 -right-12
-translate-y-2/4
"
          />
        </>
      ) : (
        <div
          className="w-full  h-full flex justify-center items-center
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
  );
};

export default TrendingCoin;
