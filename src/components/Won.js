import React from "react";

const Won = ({ isWin }) => {
  return <div className="won">{isWin && "You Won the Game"}</div>;
};

export default Won;
