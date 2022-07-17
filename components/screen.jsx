import React, { useState, useRef } from "react";
import Head from "next/head";
// import Scoreboard from "./scoreboard";
const all_cells = Array.apply(null, Array(9)).map(function () {});

const Screen = () => {
  const cellsRef = useRef(null);
  const lineRef = useRef(null);
  const [currentPlayer, setCurrentPlayer] = useState(true);
  const [winner, setWinner] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState({ player1: 0, player2: 0 });
  const [canPlay, setCanPlay] = useState(true);
  const [message, setMessage] = useState("Working on it!!");
  const WIN_COMBO = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const reStart = () => {
    const child = cellsRef.current.childNodes;
    child.forEach((e) => {
      e.childNodes[0].classList.remove("x");
      e.childNodes[0].classList.remove("circle");
      lineRef.current.style = "";
      lineRef.current.classList.remove("line", "opacity-5");
      setWinner(false);
      setGameOver(false);
      setMessage("Working on it!!");
      setCanPlay(true);
    });
  };
  const checkWinner = (currentClass, child) => {
    let combination;
    const isWin = WIN_COMBO.some((combo) => {
      const win = combo.every((index) => {
        return child[index].childNodes[0].classList.contains(currentClass);
      });
      combination = win ? combo : null;
      return win;
    });
    return { isWin, combination };
  };

  const checkDraw = (all_child) => {
    return [...all_child].every((child) => {
      return (
        child.childNodes[0].classList.contains("x") ||
        child.childNodes[0].classList.contains("circle")
      );
    });
  };

  const addClass = async (e) => {
    let className;

    if (
      canPlay &&
      !(
        e.currentTarget.classList.contains("x") ||
        e.currentTarget.classList.contains("circle")
      ) &&
      !gameOver
    ) {
      setCanPlay(false);
      const all_child = cellsRef.current.childNodes;
      if (currentPlayer) {
        e.currentTarget.classList.add("x");
        className = "x";
      } else {
        e.currentTarget.classList.add("circle");
        className = "circle";
      }
      const { isWin, combination } = checkWinner(className, all_child);
      if (isWin) {
        if (combination[0] === 0 || combination[0] === 2) {
          if (combination[2] === 8 && combination[0] === 0) {
            lineRef.current.style = "top:50%; animation: line45 forwards 1s;";
          } else if (combination[2] === 8 && combination[0] === 2) {
            lineRef.current.style =
              "top:50%; left:33.2%; animation: line90 forwards 1s;";
          } else if (combination[2] === 6 && combination[0] === 2) {
            lineRef.current.style = "top:50%; animation: line-45 forwards 1s;";
          } else if (combination[2] === 2) {
            lineRef.current.style = "top:16.6%; animation: line0 forwards 1s;";
          } else if (combination[2] === 6) {
            lineRef.current.style =
              "top:50%; left:-33.2%; animation: line90 forwards 1s;";
          }
        } else if (combination[0] === 3 || combination[0] === 6) {
          if (combination[2] === 5) {
            lineRef.current.style = "top:50%; animation: line0 forwards 1s;";
          } else if (combination[2] === 8) {
            lineRef.current.style =
              "bottom: 16.6%; animation: line0 forwards 1s;";
          }
        } else if (combination[0] === 1) {
          lineRef.current.style = "top:50%; animation: line90 forwards 1s;";
        }
        lineRef.current.classList.add("line");
        lineRef.current.addEventListener("animationend", () => {
          setGameOver(true);
          setMessage("Winner!!");
          setWinner(true);
          lineRef.current.classList.add("opacity-5");
        });

        setScore((current) =>
          currentPlayer
            ? { ...current, player1: current.player1++ }
            : { ...current, player1: current.player1++ }
        );
      } else if (checkDraw(all_child)) {
        setGameOver(true);
        setWinner(false);
        setMessage("Match Draw!!!");
      } else {
        setCurrentPlayer(!currentPlayer);
        setCanPlay(true);
      }
    }
  };

  return (
    <>
      <Head>
        {gameOver ? (
          <title>{`${
            winner
              ? currentPlayer
                ? "X is Winner"
                : "O is Winner"
              : "Match Draw!!"
          }`}</title>
        ) : (
          <title>{`${currentPlayer ? "X" : "O"}'s Move`}</title>
        )}
      </Head>
      <div className="flex justify-center flex-col items-center w-screen h-screen">
        <div className="font-medium text-3xl">Tic-Tac-Toe</div>
        <div className="md:shadow-md rounded-lg md:w-1/2 h-2/4 flex flex-col justify-evenly items-center xl:max-h-[500px] xl:min-w-[400px] min-h-[500px] w-fit">
          {/* Score Board  */}
          <div className="flex w-full justify-evenly h-16">
            {/* player 1 */}
            <div
              className={`md:w-1/4 w-1/3 flex justify-center items-center  ${
                currentPlayer
                  ? "border-slate-700 border-b-4 rounded-md shadow-md transition-all"
                  : ""
              }`}
            >
              <div className="flex justify-center items-center w-10 h-10 relative before:absolute after:absolute smallX mr-2"></div>
              <div className="text-slate-800 font-medium text-xl">
                - {score.player1}
              </div>
            </div>
            {/* player 2 */}
            <div
              className={`md:-1/4 w-1/3 flex justify-center items-center ${
                currentPlayer
                  ? ""
                  : "border-slate-700 border-b-4 rounded-md shadow-md transition-all"
              }`}
            >
              <div className="flex justify-center items-center w-10 h-10 relative before:absolute after:absolute smallCircle mr-2"></div>
              <div className="text-slate-800 font-medium text-xl">
                {" "}
                - {score.player2}
              </div>
            </div>
          </div>
          {/* END */}
          <div className=" overflow-hidden w-[336px] h-[336px] relative">
            <div
              ref={lineRef}
              className={`z-10 absolute rounded-xl bg-gray-800 `}
              id="line"
            ></div>
            <div
              className={`after:bg-gray-800  m-0 w-[336px] h-[336px] grid transition-all duration-400 text-center justify-center content-center items-center grid-cols-3 ${
                gameOver ? "bg-white opacity-5" : "opacity-100"
              }`}
              ref={cellsRef}
            >
              {all_cells.map((cell, index) => {
                return (
                  <div
                    className="w-28 select-none transition-all duration-300 cursor-pointer cell h-28 flex border-slate-700 border-2 justify-center items-center relative"
                    key={index}
                    id={index}
                  >
                    <div
                      className="w-full h-full flex justify-center items-center relative before:absolute after:absolute"
                      onClick={addClass}
                    ></div>
                  </div>
                );
              })}
            </div>
            <div
              className={`flex justify-center transition-all duration-200 items-center absolute w-[336px] h-[336px]  opacity-1 ${
                gameOver ? "-translate-y-[21rem]" : ""
              }`}
            >
              <div className="grid justify-center items-center place-items-center">
                {gameOver ? (
                  winner ? (
                    <div
                      className={`${
                        currentPlayer ? "x" : "circle"
                      } relative w-28 h-28 before:absolute after:absolute flex justify-center items-center`}
                    ></div>
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}
                <h1 className=" font-semibold text-4xl m-2 px-3">{message}</h1>
                <button
                  onClick={reStart}
                  className="mx-auto w-fit h-2/3 m-3 mt-5 p-4 px-2 bg-slate-800 text-white font-semibold text-xl transition-all duration-300 rounded-lg shadow-sm hover:scale-95"
                >
                  Play Again
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Screen;
