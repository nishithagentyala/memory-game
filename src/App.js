import React from "react";
import SelectCardGrid from "./components/SelectCardGrid";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div className="App">
        <h2>Memory Game</h2>
        <Routes>
          <Route path="/" element={<SelectCardGrid />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
