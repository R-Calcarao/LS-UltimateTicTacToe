import React, { useEffect, useState } from "react";
import { calculateWinner, winnerFullBoard } from "../../helpers/winner";
import { boardIsFull } from "../../helpers/fullBoard";
import "./game-panel.css";
import Board from "../board/board.component";

const GamePanel = (props) => {
  const {
    player1Name,
    player2Name,
    player1Symbol,
    player2Symbol,
    gameStarted,
    gameOver,
    setGameOver,
    setWinner,
    level,
    replay,
  } = props;

  const [boards, setBoards] = useState(Array(9).fill(Array(9).fill(null))); //gera um array de 9 e em cada indice  um array de 9 iniciados a NULL
  const [nextBoard, setNextBoard] = useState(Math.floor(Math.random() * 9)); // define o 1 tab de forma random
  const [xIsNext, setXIsNext] = useState(Math.round(Math.random()) === 1); // variavel para saber o prox jogador 'X' ou 'O' e é inicializada de formas random pq 
  const [winners, setWinners] = useState(Array(9).fill(null));             //o math.random gera o um n randm entre 0 e 1 e o math, round arredonda para 0 ou 1.
  const [timerJ1, setTimerJ1] = useState(40);                              // const [winners, setWinners] = useState(Array(9).fill(null));  -> para definir o array de vencedores de cada mini tab
  const [timerJ2, setTimerJ2] = useState(40);

  useEffect(() => {                                                 //para o tempo dos jogadores
    let timerId = undefined;
    if (level === "2" && gameStarted) {                             // so faz sentido se houverem dois jogadores
      if (
        (xIsNext && player1Symbol === "X") ||                         
        (!xIsNext && player1Symbol === "O")
      ) {
           // Verifica se é a vez correta do jogador 1 com o símbolo correto     
        timerId = setInterval(() => {         // Inicia um temporizador                             
          setTimerJ1((previousState) => { // Atualiza o estado do temporizador do jogador 1      
            const nextTimer = previousState - 1; // Calcula o próximo estado do temporizador subtraindo 1 do estado anterior                 
            if (nextTimer === 0) {// Verifica se o temporizador chegou a zero (tempo esgotado)                 
              setWinner(player1Symbol === "X" ? "O" : "X");// Define o vencedor como o jogador cujo símbolo é diferente do símbolo do jogador 1                    
              setGameOver(true); // Indica que o jogo acabou                  
              clearInterval(timerId);// Interrompe a execução do temporizador                  
            }
            return nextTimer;// Retorna o próximo estado do temporizador                 
          });     
        }, 1000);// Executa a função a cada 1000 milissegundos (1 segundo)       
      } else {
        timerId = setInterval(() => {// Inicia um temporizador  
          setTimerJ2((previousState) => {// Atualiza o estado do temporizador do jogador 2 
            const nextTimer = previousState - 1; // Calcula o próximo estado do temporizador subtraindo 1 do estado anterior
            if (nextTimer === 0) {// Verifica se o temporizador chegou a zero (tempo esgotado) 
              setWinner(player2Symbol === "X" ? "O" : "X");// Define o vencedor como o jogador cujo símbolo é diferente do símbolo do jogador 2
              setGameOver(true);//Indica que o jogo acabou  
              clearInterval(timerId);// Interrompe a execução do temporizador
            }
            return nextTimer;// Retorna o próximo estado do temporizador
          });
        }, 1000);// Executa a função a cada 1000 milissegundos (1 segundo) 
      }
      if (gameOver) {
        clearInterval(timerId); // para de contar
      }
    } else {
      setTimerJ1(40); //reset ao contador  de tempo
      setTimerJ2(40);
    }
    return () => {                // vai devolvendo o tempo
      if (timerId) {          
        clearInterval(timerId);
      }
    };
  }, [gameStarted, setGameOver, setWinner, xIsNext, gameOver, level]);

  useEffect(() => {
    if (level === "1") {  // Verifica se o nível do jogo é 1
      if ((xIsNext && player2Symbol === "X") || (!xIsNext && player2Symbol === "O")) { // Verifica se é a vez correta do jogador 2 com o símbolo correto
        const availableSquares = []; // Cria um array para armazenar as posições disponíveis no tabuleiro
        for (let i = 0; i < boards[nextBoard].length; i++) {
          if (boards[nextBoard][i] === null) {// Verifica se a posição no tabuleiro está vazia (não preenchida)
            availableSquares.push(i);// Adiciona a posição vazia ao array de posições disponíveis
          }
        }
        if (availableSquares.length > 0) { // Verifica se existem posições disponíveis no tabuleiro
          setTimeout(() => {// Adiciona um atraso para simular uma ação do jogador 2
            const randomIndex = Math.floor(Math.random() * availableSquares.length); // Gera um índice aleatório baseado no número de posições disponíveis
            const randomSquare = availableSquares[randomIndex];// Seleciona uma posição aleatória dentre as disponíveis
            const newBoards = [...boards];
            const newBoard = [...newBoards[nextBoard]];                                   // Cria cópias dos arrays boards e winners para atualização dos dados
            const newWinners = [...winners];

            setNextBoard(randomSquare);// Atualiza o próximo tabuleiro a ser jogado
            newBoard[randomSquare] = xIsNext ? "X" : "O";    // Preenche a posição selecionada com o símbolo do jogador 2
            newBoards[nextBoard] = newBoard;  // Atualiza o array de tabuleiros com o tabuleiro atualizado          
            setBoards(newBoards); // Atualiza o estado dos tabuleiros  

            //Ao fazer alterações nos arrays copiados, como adicionar o símbolo do jogador 2 em uma posição específica ou atualizar os resultados dos tabuleiros, você pode ter um controle melhor sobre as mudanças de estado. 
            //Além disso, isso ajuda a evitar problemas de mutabilidade acidental e torna mais fácil o rastreamento das alterações feitas em cada cópia.
            
            setXIsNext(!xIsNext);  // Alterna a vez do jogador        
            if (boardIsFull(newBoard)) {// Verifica se o tabuleiro está completamente preenchido (empate)              
              newWinners[nextBoard] = "E";// Define o resultado do tabuleiro como empate             
              setWinners(newWinners);// Atualiza o estado dos resultados dos tabuleiros             
            }  
            const miniVencedor = calculateWinner(newBoard); // Verifica se há um vencedor no tabuleiro atual             
            if (miniVencedor) {
              newWinners[nextBoard] = miniVencedor;// Define o resultado do tabuleiro como o vencedor encontrado                
              setWinners(newWinners);// Atualiza o estado dos resultados dos tabuleiros              
            }
          }, 500); // Define um atraso de 500 milissegundos antes da jogada do jogador 2        
        }
      }
    }
  }, [xIsNext, boards, level, nextBoard, player2Symbol, winners]);
  

  const handleSquareClick = (boardIndex, squareIndex) => {
    const newBoards = [...boards]; // Cria uma cópia do array 'boards' para evitar a modificação direta dos dados originais 
    const newBoard = [...newBoards[boardIndex]];// Cria uma cópia do tabuleiro específico dentro do array 'boards'
    const newWinners = [...winners]; // Cria uma cópia do array 'winners'

    setNextBoard(squareIndex); // Define o próximo tabuleiro a ser jogado

    newBoard[squareIndex] = xIsNext ? "X" : "O";// Preenche a posição do tabuleiro com o símbolo correto (X ou O) dependendo de quem está jogando
    newBoards[boardIndex] = newBoard; // Atualiza o tabuleiro específico no array 'boards' com o novo tabuleiro atualizado
    setBoards(newBoards);    // Atualiza o estado dos tabuleiros

    setXIsNext(!xIsNext);  // Alterna a vez do jogador

    if (boardIsFull(newBoard)) {  // Verifica se o tabuleiro está completamente preenchido (empate)
      newWinners[boardIndex] = "E"; // Define o resultado do tabuleiro como empate
      setWinners(newWinners); // Atualiza o estado dos resultados dos tabuleiros
    }
    const miniVencedor = calculateWinner(newBoard); // Verifica se há um vencedor no tabuleiro atual
    if (miniVencedor) {
      newWinners[boardIndex] = miniVencedor; // Define o resultado do tabuleiro como o vencedor encontrado
      setWinners(newWinners);  // Atualiza o estado dos resultados dos tabuleiros
    }
  };
  

  useEffect(() => {
    const vencedor = calculateWinner(winners); // Verifica se há um vencedor geral com base nos resultados dos tabuleiros

    if (vencedor === "X" || vencedor === "O") {  // Verifica se o vencedor geral é X ou O
      setWinner(vencedor);  // Define o vencedor geral
      setGameOver(true); // Indica que o jogo acabou
    } else if (boardIsFull(winners)) {   // Verifica se todos os tabuleiros estão completamente preenchidos (empate geral)
      const vencedorEmpate = winnerFullBoard(winners);  // Verifica qual jogador possui mais tabuleiros vencidos
      setWinner(vencedorEmpate);   // Define o vencedor ou empate geral
      setGameOver(true);  // Indica que o jogo acabou
    }
  }, [winners, setGameOver, setWinner]);

  useEffect(() => {
    if (replay) {  // Verifica se a variável 'replay' é verdadeira
      setBoards(Array(9).fill(Array(9).fill(null)));    // Cria um novo array de tabuleiros preenchido com arrays preenchidos com valores nulos
      setNextBoard(Math.floor(Math.random() * 9));  // Define um próximo tabuleiro aleatório para jogar (valor entre 0 e 8)
      setXIsNext(Math.round(Math.random()) === 1);   // Define aleatoriamente qual jogador será o próximo (X ou O) 
      setWinners(Array(9).fill(null));  // Cria um novo array de resultados dos tabuleiros preenchido com valores nulos 
      setWinner(null);  // Limpa o resultado geral do jogo (vencedor ou empate)
      setTimerJ1(60);   // Reinicia o temporizador do jogador 1 com 60 segundos
      setTimerJ2(60);   // Reinicia o temporizador do jogador 2 com 60 segundos
    }
  }, [replay, setWinner, setBoards]);
  
  const renderBoard = (boardIndex) => {
    const squares = boards[boardIndex];
    let squareClassName;
    let disabled;
  
    if (winners[boardIndex] != null) {   // Verifica se há um vencedor no tabuleiro atual
      if (winners[boardIndex] === "X") {  // Verifica se o vencedor é X
        squareClassName = "winner-square X";  // Define a classe do quadrado como "winner-square X" para estilização específica
        disabled = true;    // Desabilita o clique nos quadrados
      } else if (winners[boardIndex] === "O") {     // Verifica se o vencedor é O
        squareClassName = "winner-square O";  // Define a classe do quadrado como "winner-square O" para estilização específica
        disabled = true;  // Desabilita o clique nos quadrados
      } else if (winners[boardIndex] === "E") {  // Verifica se há um empate no tabuleiro atual
        squareClassName = "winner-square E"; // Define a classe do quadrado como "winner-square E" para estilização específica
        disabled = true;  // Desabilita o clique nos quadrados
      }
    } else if (boardIndex === nextBoard) {   // Verifica se é o próximo tabuleiro a ser jogado
      if (xIsNext) {
        squareClassName = "active-squareX";   // Define a classe do quadrado como "active-squareX" para estilização específica
      } else {
        squareClassName = "active-squareO";     // Define a classe do quadrado como "active-squareO" para estilização específica
      }
      disabled = false;  // Habilita o clique nos quadrados do tabuleiro atual
    } else {
      squareClassName = "square";   // Define a classe do quadrado como "square" para estilização padrão
      disabled = true;    // Desabilita o clique nos quadrados
    }
    if (winners[nextBoard] != null) {      // Verifica se há um vencedor no próximo tabuleiro
      let disponiveis = [];
      for (var i = 0; i < winners.length; i++) {
        if (winners[i] === null) {        // Verifica quais tabuleiros ainda não possuem vencedor
          disponiveis.push(i);    // Adiciona os tabuleiros disponíveis ao array 'disponiveis'
        }
      }
      if (disponiveis.length > 0) {  // Verifica se existem tabuleiros disponíveis
        let indiceRandom = Math.floor(Math.random() * disponiveis.length);
        let posicaoRandom = disponiveis[indiceRandom];     // Seleciona aleatoriamente um tabuleiro disponíve
        setNextBoard(posicaoRandom);    // Define o próximo tabuleiro a ser jogado como o tabuleiro selecionado aleatoriamente
      }
    }
    return (
      <Board
        squareClassName={squareClassName}
        squares={squares}
        onClick={(squareIndex) => handleSquareClick(boardIndex, squareIndex)}
        disabled={disabled}
      />
    );
  };
  

  return (
    <section className={gameStarted ? "jogo" : "jogo hide"}>
      <div className="pre-jogo-info">
        {gameStarted && (
          <div className="info-nomes">
            {player1Symbol && player2Symbol && (
              <div id="j1">
                <div id="nome1">
                  Jogador 1: {player1Name} (
                  <span className={`cor-${player1Symbol}`}>
                    {player1Symbol}
                  </span>
                  )
                </div>
                {level === "2" && <div id="timer">{timerJ1}</div>}
              </div>
            )}
            {player1Symbol && player2Symbol && (
              <div id="j2">
                <div id="nome2">
                  Jogador 2: {player2Name} (
                  <span className={`cor-${player2Symbol}`}>
                    {player2Symbol}
                  </span>
                  )
                </div>
                {level === "2" && <div id="timer">{timerJ2}</div>}
              </div>
            )}
          </div>
        )}
      </div>
      <div id="bigBoard" className="game-panel">
      {renderBoard(0)} {/* Renderiza o tabuleiro de índice 0 */}
      {renderBoard(1)} {/* Renderiza o tabuleiro de índice 1 */}
      {renderBoard(2)} {/* Renderiza o tabuleiro de índice 2 */}
      {renderBoard(3)} {/* Renderiza o tabuleiro de índice 3 */}
      {renderBoard(4)} {/* Renderiza o tabuleiro de índice 4 */}
      {renderBoard(5)} {/* Renderiza o tabuleiro de índice 5 */}
      {renderBoard(6)} {/* Renderiza o tabuleiro de índice 6 */}
      {renderBoard(7)} {/* Renderiza o tabuleiro de índice 7 */}
      {renderBoard(8)} {/* Renderiza o tabuleiro de índice 8 */}
      </div>
    </section>
  );
};

export default GamePanel;
