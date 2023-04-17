import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Coins from "./components/Coins";
import CoinDetails from "./components/CoinDetails";
import Exchange from "./components/Exchange";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Error from "./components/Error";
import Loader from "./components/Loader2";

const App = () => {
  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, 2000);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Router>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/exchanges" element={<Exchange />} />
              <Route path="/coins" element={<Coins />} />
              <Route path="/coins/:id" element={<CoinDetails />} />
              <Route path="*" element={<Error />} />
            </Routes>
            <Footer />
          </Router>
        </>
      )}
    </>
  );
};

export default App;
