import "./App.css";
import axios from "axios";

import React, { useState, useEffect } from "react";
import Coin from "./Coin";

// https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false
function App() {
  const [coins, setCoins] = useState([]);
  const [search, setsearch] = useState("");

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false"
      )
      .then((res) => setCoins(res.data))
      .catch((error) => console.log(error));
  }, []);

  const inputHandler = (e) => {
    setsearch(e.target.value);
  };

  const filteredCoins = coins.filter((coin) => {
    return coin.name.toLowerCase().includes(search.toLowerCase());
  });
  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Search a currency </h1>
        <form>
          <input
            className="coin-input"
            type="text"
            placeholder="Search a coin"
            onChange={inputHandler}
          />
        </form>
      </div>
      {/* <Coin coins={coins} /> */}
      {filteredCoins.map(
        ({
          name,
          id,
          symbol,
          market_cap,
          current_price,
          image,
          price_change_24h,
          market_cap_change_percentage_24h,
        }) => {
          return (
            <Coin
              key={id}
              name={name}
              image={image}
              symbol={symbol}
              volume={market_cap}
              price={current_price}
              priceChange={price_change_24h}
              marketcapchangepercentage={market_cap_change_percentage_24h}
            />
          );
        }
      )}
    </div>
  );
}

export default App;
