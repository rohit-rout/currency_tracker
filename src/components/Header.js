import React from "react";
import { Link } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import "./Header.css";
const Header = (props) => {
  const { currency, setCurrency} = CryptoState();
  return (
    <div className="main">
      <Link to="/" className="title">
        <h2>Crypt-o-Hunt</h2>
      </Link>
      <div className="choose_currency">
        <label htmlFor="currency"> </label>
        <select
          name="currency"
          id="currency"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          <option value="USD" >&#160;USD </option>
          <option value="INR">&#160;INR </option>
        </select>
      </div>
    </div>
  );
};

export default Header;
