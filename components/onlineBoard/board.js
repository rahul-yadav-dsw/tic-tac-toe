import React from "react";

const Board = ({
  lineRef,
  gameOver,
  cellsRef,
  all_cells,
  addClass,
  winner,
  currentPlayer,
  message,
  reStart,
}) => {
  return (
    <div className="overflow-hidden w-[336px] h-[336px] relative">
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
  );
};

export default Board;
