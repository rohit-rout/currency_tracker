import "./App.css";
import Header from "./components/Header";
import MainPage from "./pages/MainPage";
import CoinPage from "./pages/CoinPage";
import { Routes, Route } from "react-router-dom";
import Error from "./pages/Error";




function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/coin/:id" element={<CoinPage />} />
        <Route path="*" element={<Error/>}/>
      </Routes>
     
    </>
  );
}

export default App;
