import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { CryptoState } from "../CryptoContext";
import { useEffect } from "react";
import axios from "axios";
import { CoinsList } from "../config/api";
import { ConvertCommas } from "./Card";
import "./CoinTable.css";
import { Container, Pagination, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";

// Function to convert a number to international currency system

function convertToInternationalCurrencySystem(labelValue) {
  // Nine Zeroes for Billions
  return Math.abs(Number(labelValue)) >= 1.0e9
    ? (Math.abs(Number(labelValue)) / 1.0e9).toFixed(2) + "B"
    : // Six Zeroes for Millions
    Math.abs(Number(labelValue)) >= 1.0e6
    ? (Math.abs(Number(labelValue)) / 1.0e6).toFixed(2) + "M"
    : // Three Zeroes for Thousands
    Math.abs(Number(labelValue)) >= 1.0e3
    ? (Math.abs(Number(labelValue)) / 1.0e3).toFixed(2) + "K"
    : Math.abs(Number(labelValue));
}

//

const row_index = ["Coin", "Price", "24h Change", "Market Cap"];
const CoinTable = () => {
  const [allCoins, setAllCoins] = useState([]);
  const [Search, setSearch] = useState("");
  const [curPage, setCurPage] = useState(1);
  const { currency, symbol } = CryptoState();

  async function fectchAllCoins() {
    const { data } = await axios.get(CoinsList(currency));
    setAllCoins(() => data);
  }

  const filterPage = () => {
    let array =
      Search !== ""
        ? allCoins.filter(
            (coin) =>
              coin.name.toLowerCase().includes(Search) ||
              coin.symbol.toLowerCase().includes(Search)
          )
        : allCoins;
    // setFilterCoins(array);
    return array?.slice(curPage - 1, Math.min(curPage - 1 + 10, array.length));
  };
  const filterSearch = () => {
    return Search !== ""
      ? allCoins.filter(
          (coin) =>
            coin.name.toLowerCase().includes(Search) ||
            coin.symbol.toLowerCase().includes(Search)
        )
      : allCoins;
  };

  useEffect(() => {
    fectchAllCoins();
  }, [currency]);

  return (
    <>
      {/* <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }} /> */}
      <TableContainer component={Paper}>
        <Container maxWidth="lg">
          <Typography variant="h4" style={{ margin: 18 }}>
            Cryptocurrency Prices by Market Cap
          </Typography>

          <TextField
            className="text_field"
            id="outlined-basic"
            label="Search your currency..."
            variant="outlined"
            autoComplete="off"
            onChange={(e) => {
              setSearch(e.target.value);
              filterSearch();
            }}
          />
          <Table sx={{ minWidth: 600 }} aria-label="simple table">
            <TableHead style={{ backgroundColor: "#FFB200" }}>
              <TableRow>
                {row_index.map((val) => {
                  return (
                    <TableCell
                      align={val === "Coin" ? "" : "right"}
                      key={val}
                      style={{ color: "black", fontWeight: "bold" }}
                    >
                      {val}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {filterPage()?.map((coin, index) => {
                let profit = coin.price_change_percentage_24h > 0;
                return (
                  <TableRow key={index} sx={{ border: 0 }}>
                    <TableCell component="th" scope="row">
                      <div className="coin_container">
                        <img src={coin.image} alt={coin.name} height="50" />
                        <div className="coin_data">
                          <h3>{coin.symbol.toUpperCase()}</h3>
                          <h4>{coin.name}</h4>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell align="right">
                      {symbol}{" "}
                      {ConvertCommas(
                        convertToInternationalCurrencySystem(coin.current_price.toFixed(2))
                      )}
                    </TableCell>
                    <TableCell
                      align="right"
                      style={{
                        color: `${profit ? "rgb(14,203,129" : "red"}`,
                        fontWeight: 500,
                      }}
                    >
                      <span>{profit && "+"}</span>
                      {ConvertCommas(
                        coin.price_change_percentage_24h.toFixed(2)
                      )}{" "}
                      %
                    </TableCell>
                    <TableCell align="right">
                      {symbol}{" "}
                      {ConvertCommas(
                        convertToInternationalCurrencySystem(coin.market_cap)
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <Stack spacing={2}>
            <Pagination
              style={{ margin: "1rem auto" }}
              page={curPage}
              count={Math.ceil(filterSearch().length / 10)}
              onClick={(e) => setCurPage(Number(e.target.innerText))}
            />
          </Stack>
        </Container>
      </TableContainer>
    </>
  );
};

export default CoinTable;
