import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import BookSeat from "./components/BookSeat";
import FruitPage from "./components/FruitPage";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book-seat/:seatId" element={<BookSeat />} />
        {/* 用来测试的路由 */}
        <Route path="/fruit/:fruitName" element={<FruitPage />} />
        {/* 没有匹配的路由 */}
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
