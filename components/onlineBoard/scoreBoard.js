import React from "react";

const ScoreBoard = ({ currentPlayer, score }) => {
  return (
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
          - {score.player2}
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;
