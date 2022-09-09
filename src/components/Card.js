import React from "react";
import "./Card.css";
import { Link } from "react-router-dom";
const Card = ({ coin }) => {
  let profit = coin.price_change_percentage_24h > 0;
  return (
    <Link to={`coin/${coin.id}`} className="link">
      <div className="card">
        <img src={coin.image} alt={coin.id} height="80" />
        <h3>{coin.name}</h3>
        <span>
          {coin.symbol}
          {profit && " +"}
          {coin.price_change_percentage_24h.toFixed(2)} %
        </span>
      </div>
    </Link>
  );
};

export default Card;
