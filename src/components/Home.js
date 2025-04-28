import React, { useState, useEffect } from "react";
import "./Home.css";

const Home = () => {
  const [arr, setArr] = useState([]);
  const [clickedBoxes, setClickedBoxes] = useState([]);
  const [matchedBoxes, setMatchedBoxes] = useState([]);
  const [isWin, setIsWin] = useState(false);

  const generateNums = () => {
    const nums = [];
    for (let i = 1; i <= 8; i++) {
      nums.push(i);
      nums.push(i);
    }
    for (let i = nums.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [nums[i], nums[j]] = [nums[j], nums[i]];
    }
    setArr(nums);
  };

  const handleClick = (index) => {
    if (
      (clickedBoxes.length === 2) |
      clickedBoxes.includes(index) |
      matchedBoxes.includes(index)
    ) {
      return;
    }
    setClickedBoxes((prev) => [...prev, index]);
  };
  useEffect(() => {
    if (clickedBoxes.length === 2) {
      const [first, second] = clickedBoxes;
      if (arr[first] === arr[second]) {
        setMatchedBoxes((prev) => [...prev, first, second]);
        setClickedBoxes([]);
      } else {
        setTimeout(() => {
          setClickedBoxes([]);
        }, 1000);
      }
    }
    if (matchedBoxes.length === 16) {
      setIsWin(true);
    }
  }, [clickedBoxes, arr, matchedBoxes]);

  const restartGame = () => {
    generateNums();
    setClickedBoxes([]);
    setMatchedBoxes([]);
    setIsWin(false);
  };
  return (
    <>
      <div className="boxes">
        {arr.map((num, index) => (
          <div
            className={
              matchedBoxes.includes(index)
                ? "activeBox box"
                : clickedBoxes.includes(index)
                ? "clicked box"
                : "box"
            }
            key={index}
            onClick={() => {
              handleClick(index);
            }}
          >
            <span
              className={
                clickedBoxes.includes(index) | matchedBoxes.includes(index)
                  ? "active num"
                  : "num"
              }
            >
              {clickedBoxes.includes(index) || matchedBoxes.includes(index)
                ? num
                : ""}
            </span>
          </div>
        ))}
      </div>
      {isWin && <p>You Won</p>}
      <button onClick={restartGame}>New Game</button>
    </>
  );
};

export default Home;
