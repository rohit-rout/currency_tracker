import React from 'react'
import Banner from "../components/Banner"
import CoinTable from '../components/CoinTable'
import { ThemeProvider, createTheme } from "@mui/material/styles";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const MainPage = () => {
  return (
    <>
     <ThemeProvider theme={darkTheme}>
     <Banner/>
     <CoinTable/>
     </ThemeProvider>
    </>
  )
}

export default MainPage
