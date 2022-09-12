import React from "react";
import "./Card.css";
import { Link } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
export const ConvertCommas = (num) => {
  var commas = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return commas;
};
const Card = ({ coin }) => {
  const { symbol } = CryptoState();
  let profit = coin.price_change_percentage_24h > 0;

  return (
    <Link to={`coin/${coin.id}`} className="link">
      <div className="card">
        <img src={coin.image} alt={coin.id} height="80" />
        <h3>{coin.name}</h3>
        <span>
          {coin.symbol}
          
          <span style={{color:profit?"rgb(14,203,129)":"red" ,fontWeight:500}}>
          {profit && " +"}
             {coin.price_change_percentage_24h.toFixed(2)} %
            </span>
        </span>
        <span>
          {symbol} {ConvertCommas(coin.current_price)}
        </span>
      </div>
    </Link>
  );
};

export default Card;
