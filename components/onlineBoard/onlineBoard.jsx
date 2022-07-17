import React, { useState, useRef } from "react";
import Head from "next/head";
import Scoreboard from "./scoreboard";
import Board from "./board";
const all_cells = Array.apply(null, Array(9)).map(function () {});

const OnlineBoard = () => {
  const [currentPlayer, setCurrentPlayer] = useState(true);
  const lineRef = useRef(null);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(false);
  const cellsRef = useRef(null);
  const [message, setMessage] = useState("Working on it!!");
  const [score, setScore] = useState({ player1: 0, player2: 0 });
  const [canPlay, setCanPlay] = useState(true);

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
            lineRef.current.style = "top:16%; animation: line0 forwards 1s;";
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
          <Scoreboard score={score} currentPlayer={currentPlayer} />
          {/* END */}
          <Board
            currentPlayer={currentPlayer}
            lineRef={lineRef}
            addClass={addClass}
            message={message}
            cellsRef={cellsRef}
            all_cells={all_cells}
            gameOver={gameOver}
            reStart={reStart}
            winner={winner}
          />
        </div>
      </div>
    </>
  );
};

export default OnlineBoard;
