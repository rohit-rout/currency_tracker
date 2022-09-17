import React, { useEffect, useState } from "react";
import { CryptoState, UserState } from "../CryptoContext";
import { CoinDetails } from "../config/api";
import "./CoinInfo.css";
import HTMLReactParser from "html-react-parser";
import axios from "axios";
import { Button, Typography } from "@mui/material";
import { ConvertCommas } from "./Card";
import { convertToInternationalCurrencySystem } from "./CoinTable";
import { Container } from "@mui/system";
import { doc, setDoc } from "firebase/firestore"; 
import { db } from "../Firebase";

const CoinInfo = ({ id }) => {
  const [coinData, setCoinData] = useState();
  const [ inWatchList, setInWatchList ] = useState();
  const { currency, symbol, watchList } = CryptoState();
  console.log("render from coinInfo")
  const {user} =UserState();

 
 
  const fetchCoinDetails = async () => {
    const { data } = await axios.get(CoinDetails(id));
    setCoinData(data);
    
  };
  const addToWatchList = async() => {
    const ref = doc(db, 'watchList', user.uid);
    
   await  setDoc(ref, { coins:[...watchList,coinData.id] }, { merge: true });
   setInWatchList(true);
  };
  const removeFromWatchList = async() => {
    const ref = doc(db, 'watchList', user.uid);
    await  setDoc(ref, { coins:watchList.filter((coin)=>coin!==coinData.id)}, { merge: true });
    setInWatchList(false);
  };

  console.log(coinData);
  useEffect(()=>{
    setInWatchList(watchList?watchList.includes(coinData?.id):false);
   },[watchList])
  useEffect(() => {
    fetchCoinDetails();
  }, [currency]);
  return (
    <Container>
      <div clasName="coin_container">
        <div className="coin_details">
          <img src={coinData?.image.large} alt={id} />
          <Typography variant="h2" gutterBottom>
            {coinData?.symbol.toUpperCase()}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {coinData
              ? HTMLReactParser(coinData?.description.en.split(". ")[0])
              : ""}{" "}
            .
          </Typography>
          <Typography variant="h4" gutterBottom>
            Rank : {coinData?.market_cap_rank}
          </Typography>
          <Typography variant="h4" gutterBottom>
            Current Price : {symbol}{" "}
            {ConvertCommas(
              convertToInternationalCurrencySystem(
                coinData?.market_data.current_price[currency.toLowerCase()]
              )
            )}
          </Typography>
          <Typography variant="h4" gutterBottom>
            Market Cap : {symbol}{" "}
            {ConvertCommas(
              convertToInternationalCurrencySystem(
                coinData?.market_data.market_cap[currency.toLowerCase()]
              )
            )}
          </Typography>
          {user ? (
            <Button
              variant="contained"
              sx={{ backgroundColor: inWatchList ? "red" : "yellow" }}
              onClick={!inWatchList ? addToWatchList : removeFromWatchList}
            >
              {!inWatchList ? "add to WatchList" : "remove from watchList"}
            </Button>
          ) : (
            ""
          )}
        </div>
      </div>
    </Container>
  );
};

export default CoinInfo;
