import React from "react";
import "./square.css";

const Square = (props) => {
  const { squareClassName, player, onClick, isDisabled } = props; // Define o estilo do quadrado com base no jogador (vermelho para "X", azul para "O")
  const squareStyle = {
    color: player === "X" ? "red" : "blue",
  };
  return (
    <button
      className={squareClassName}
      style={squareStyle}
      onClick={onClick}
      disabled={isDisabled || player !== null}
    >
      {player} {/* Exibe o valor do jogador (X ou O) dentro do botão */}
    </button>
  );
};


export default Square;
