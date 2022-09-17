import React from "react";
import { useParams } from "react-router-dom";
import CoinInfo from "../components/CoinInfo";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
const CoinPage = () => {
  const { id } = useParams();

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline/>
        <CoinInfo id={id}></CoinInfo>
      </ThemeProvider>
    </>
  );
};

export default CoinPage;
