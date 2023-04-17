import React, { useState, useEffect } from "react";
import "./App.css";
import BoardComponent from "./components/BoardComponent";
import LostFigures from "./components/LostFigures";
import { Board } from "./models/Board";
import { Colors } from "./models/Colors";
import { Player } from "./models/Player";
import Timer from "./components/Timer";

const App = () => {
  // Создаём состояние для доски
  const [board, setBoard] = useState(new Board());
  /*
   * Создаём состояния, в которых будут храниться объекты для whitePlayer и blackPlayer.
   * С помощью хука useState инициализируем объекты.
   * В качестве значения по умолчанию передаём объекты класса Player с цветами.
   */
  const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE));
  const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK));
  // Создаём состояние, в которых будем хранить текущего игрока
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  useEffect(() => {
    // При монтировании компонента, при инициализации главного компонента App вызываем функцию restart 
    restart();
    // В момент запуска игры ход отдаём белому игроку
    setCurrentPlayer(whitePlayer);
  }, []);
  
  // Создаём функцию для рестарта игры
  function restart() {
    // Создаём новый объект Board
    const newBoard = new Board();
    // Вызываем метод для инициализации ячеек
    newBoard.initCells();
    // После инициализации ячеек вызываем метод addFigures в restart
    newBoard.addFigures();
    // Передаём в состояние новую доску
    setBoard(newBoard);
  }
  // Создаём функцию, с помощью которой будем переключать игрока
  function swapPlayer() {
    // Здесь будем изменять состояние по условию
    setCurrentPlayer(
      // Если цвет текущего игрока равен белому, то устанавливаем либо blackPlayer, либо whitePlayer
      currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer
    );
  }

  return (
    /*
     * Вешаем на корневой блок div класс с названием "app".
     * Добавляем доску в корневой компонент App.
     * Вызываем компонент Timer, куда передаём все необходимые пропсы.
     */
    <div className="app">
      <Timer restart={restart} currentPlayer={currentPlayer} />
      <BoardComponent
      // Передаём все необходимые пропсы
        board={board}
        setBoard={setBoard}
        // Функции будем вызывать в момент хода игрока
        currentPlayer={currentPlayer}
        swapPlayer={swapPlayer}
      />
      <div>
        <LostFigures title="Чёрные фигуры" figures={board.lostBlackFigures} />
        <LostFigures title="Белые фигуры" figures={board.lostWhiteFigures} />
      </div>
    </div>
  );
};

export default App;
