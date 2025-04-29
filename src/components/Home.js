import React, { useState, useEffect } from "react";
import "./Home.css";
import { fruits, animals } from "./images";
import Won from "./Won";

const Home = ({ theme }) => {
  const [arr, setArr] = useState([]);
  const [clickedBoxes, setClickedBoxes] = useState([]);
  const [matchedBoxes, setMatchedBoxes] = useState([]);
  const [isWin, setIsWin] = useState(false);

  const generateNums = (theme) => {
    const nums = [];
    let img = "";
    for (let i = 0; i < 8; i++) {
      img = theme === "Fruits" ? fruits[i].image : animals[i].image;

      nums.push(img);
      nums.push(img);
    }
    for (let i = nums.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [nums[i], nums[j]] = [nums[j], nums[i]];
    }
    return nums;
  };

  const handleClick = (index) => {
    if (
      clickedBoxes.length === 2 ||
      clickedBoxes.includes(index) ||
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
  }, [clickedBoxes, arr, matchedBoxes]);
  useEffect(() => {
    if (matchedBoxes.length === 16) {
      setIsWin(true);
    }
  }, [matchedBoxes, arr]);
  useEffect(() => {
    setArr(generateNums(theme));
  }, [theme]);

  const restartGame = () => {
    const shuffled = generateNums(theme); // ensure theme is passed
    setArr(shuffled);
    generateNums(theme);
    setClickedBoxes([]);
    setMatchedBoxes([]);
    setIsWin(false);
  };

  return (
    <div>
      {!isWin ? (
        <div>
          <h2>{theme} Theme</h2>
          <div className="boxes">
            {arr.map((num, index) => (
              <div
                className={clickedBoxes.includes(index) ? "clicked box" : "box"}
                key={index}
                onClick={() => {
                  handleClick(index);
                }}
              >
                {(clickedBoxes.includes(index) ||
                  matchedBoxes.includes(index)) && (
                  <img className="num" src={num} alt="cardGrid" />
                )}
              </div>
            ))}
          </div>

          <button onClick={restartGame}>{arr.length > 0 && "New Game"}</button>
        </div>
      ) : (
        <>
          {" "}
          <Won isWin={isWin} />
          <button onClick={() => window.location.reload()}>
            Back to Themes
          </button>
        </>
      )}
    </div>
  );
};

export default Home;
