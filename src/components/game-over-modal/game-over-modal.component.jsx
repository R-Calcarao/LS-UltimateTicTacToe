import React from "react";
import { Footer } from "../index";

import "./game-over-modal.css";

function GameOverModal(props) {
  const { winner, handleReset, gameOver } = props;

  let frase = "";
  if (winner) {
    frase = `O JOGADOR '${winner}' VENCEU!`; // Define a frase exibida quando há um vencedor
  } else {
    frase = "EMPATE"; // Define a frase exibida em caso de empate
  }

  return (
    <div className={gameOver ? "gameOver-panel" : "gameOver-panel hide"}>
      <header id="gameOver-header">
        <div>Jogo Terminado</div> {/* Título do modal */}
      </header>
      <div className="info" id="messageGameOver">
        <p>{frase}</p> {/* Exibe a frase de vitória ou empate */}
        <button type="button" id="btReplay" onClick={handleReset}>
          Jogar Novamente
        </button> {/* Botão para reiniciar o jogo */}
      </div>
      <footer id="gmFooter">
        <Footer /> {/* Componente Footer, exibido no rodapé do modal */}
      </footer>
    </div>
  );
}


export default GameOverModal;
