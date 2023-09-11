import React, { useEffect, useState } from "react";
import Square from "../square/square.component";
import "./board.css";

const Board = (props) => {
  const { squareClassName, squares, onClick, disabled } = props;

  //const squareClassName = disabled ? "square" : "active-square";

  const renderSquare = (i) => {
    return (
      <Square
        squareClassName={squareClassName}
        player={squares[i]}
        onClick={() => onClick(i)}
        isDisabled={disabled}
      />
    );
  };

  return (
    <div className="board">
      {renderSquare(0)}
      {renderSquare(1)}
      {renderSquare(2)}
      {renderSquare(3)}
      {renderSquare(4)}
      {renderSquare(5)}
      {renderSquare(6)}
      {renderSquare(7)}
      {renderSquare(8)}
    </div>
  );
};

export default Board;
