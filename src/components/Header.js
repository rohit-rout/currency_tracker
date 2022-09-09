import React from "react";
import { Link } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import "./Header.css";
const Header = (props) => {
  const { currency, setCurrency} = CryptoState();
  return (
    <div className="main">
      <Link to="/" className="title">
        Crypt-o-Hunt
      </Link>
      <div className="choose_currency">
        <label htmlFor="currency">Choose a currency : </label>
        <select
          name="currency"
          id="currency"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          <option value="USD">USD </option>
          <option value="INR">INR</option>
        </select>
      </div>
    </div>
  );
};

export default Header;
