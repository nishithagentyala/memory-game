import React, { useState, useEffect } from "react";
import Home from "./Home";

const SelectCardGrid = () => {
  const [theme, setTheme] = useState(null);
  const [isActive, setIsActive] = useState(true);
  useEffect(() => {
    if (theme) {
      setIsActive(false);
    }
  }, [theme]);

  return (
    <div>
      {isActive && (
        <div className="theme">
          <h2>Pick a Theme</h2>
          <button onClick={() => setTheme("Fruits")} className="themeCard">
            Fruits
          </button>
          <button onClick={() => setTheme("Animals")} className="themeCard">
            Animals
          </button>
        </div>
      )}
      {theme ? <Home theme={theme} /> : null}
    </div>
  );
};

export default SelectCardGrid;
