import "./assets/styles/App.css";
import React, { useState } from "react";
import {
  ControlPanel,
  Header,
  GamePanel,
  GameOverModal,
  Footer,
} from "./components";

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [level, setLevel] = useState("0");
  const [player1Name, setPlayer1Name] = useState("");
  const [player2Name, setPlayer2Name] = useState("");
  const [player1Symbol, setPlayer1Symbol] = useState("");
  const [player2Symbol, setPlayer2Symbol] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [replay, setReplay] = useState(false);

  const handleLevelChange = (event) => { // guada se é singleplayer ou multiplayer
    setLevel(event.target.value);

    setPlayer1Name("");
    setPlayer2Name("");
  };

  const handlePlayer1NameChange = (event) => { // sempre que muda o nome ele guarda o nome do jogador 1
    setPlayer1Name(event.target.value);
  };

  const handlePlayer2NameChange = (event) => { // sempre que muda o nome ele guarda o nome do jogador 2, isto no livel 2
    if (level === "2") { 
      setPlayer2Name(event.target.value);
    }
  };

  const handleGameStart = () => {               // função para o inicio do jogo
    if (gameStarted) {
      console.log("Termina Jogo");
      setGameStarted(false);
    } else {
      if (                                                                                // nao deixa avançar enquanto ainda nao estiver o nivel e 
        level === "0" ||                                                                  //os nomes preenchidos, nao da para começar o jogo
        (level === "1" && player1Name === "") ||
        (level === "2" && (player1Name === "" || player2Name === ""))
      ) {
        alert("Por favor preencha todos os campos antes de iniciar o jogo.");
        return;
      }

      // Generate random symbols for the players
      const randomSymbols = Math.random() < 0.5 ? ["X", "O"] : ["O", "X"];
      setPlayer1Symbol(randomSymbols[0]);
      setPlayer2Symbol(randomSymbols[1]);

     if (level === "1") setPlayer2Name("Computador");    

      setGameStarted(true);
      setReplay(false);
      setGameOver(false);
    }
  };

  const handleReset = () => { // o replay passa a ser true 
    setReplay(true);
    setGameOver(false);
    setGameStarted(false);
    setPlayer1Name("");
    setPlayer2Name("");
    setPlayer1Symbol("");
    setPlayer2Symbol("");
    setLevel("0");
  };

  return (
    <div id="container">
      <Header />
      <main className="main-content">
        <ControlPanel                                                               
          gameStarted={gameStarted}                                                 
          onGameStart={handleGameStart}
          level={level}
          onLevelChange={handleLevelChange}
          handlePlayer1NameChange={handlePlayer1NameChange}
          handlePlayer2NameChange={handlePlayer2NameChange}
          player1Name={player1Name}
          player2Name={player2Name}
        />

        <GamePanel
          gameStarted={gameStarted}
          player1Name={player1Name}
          player2Name={player2Name}
          player1Symbol={player1Symbol}
          player2Symbol={player2Symbol}
          gameOver={gameOver}
          setGameOver={setGameOver}
          setWinner={setWinner}
          level={level}
          replay={replay}
        />
        <Footer />
      </main>
      <div class={gameOver ? "modalOn" : "modalOff"} id="game-over"></div>
      <GameOverModal
        winner={winner}
        handleReset={handleReset}
        gameOver={gameOver}
      />
    </div>
  );
}

export default App;

