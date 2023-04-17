import React, { FC, useEffect, useState } from "react";
import { Board } from "../models/Board";
import CellComponent from "./CellComponent";
import { Cell } from "../models/Cell";
import { Player } from "../models/Player";

interface BoardProps {
  // Пропсами передаём доску и функцию, с помощью которой можно изменить board
  board: Board;
  setBoard: (board: Board) => void;
  // Передаём пропсами currentPlayer, где принимаем либо Player, либо null
  currentPlayer: Player | null;
  // swapPlayer - это обычная функция, которая ничего не принимает и не возвращает
  swapPlayer: () => void;
}
// Указываем, что это функциональный компонент, и передаём в качестве интерфейса BoardProps
const BoardComponent: FC<BoardProps> = ({
  board,
  setBoard,
  currentPlayer,
  swapPlayer,
}) => {
  // Создаём состояние, где указываем тип, т.е. либо ячейка, либо null
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

  // Создаём функцию, которая будет отрабатывать при нажатие на ячейку и принимать аргументом ячейку, на которую польз-ль нажмёт
  function click(cell: Cell) {
    // Создаём условие
    if (
      // Если есть выбранная ячейка, на которой стоит фигура
      selectedCell &&
      // Если ячейка не равняется той ячейке, на которую хотим нажать
      selectedCell !== cell &&
      // Если метод возвращает true для этой ячейки
      selectedCell.figure?.canMove(cell)
    ) {
      // То в таком случае вызываем метод moveFigures и передаём в качестве target выбранную ячейку
      selectedCell.moveFigure(cell);
      // Когда фигуры перемещаются, переключаем игроков
      swapPlayer();
      // После чего выбранную ячейку можно обнулить
      setSelectedCell(null);
      // Обновляем доску
      updateBoard();
    } else {
      /*
       * Если ячейка содержит фигуру, то в таком случае и изменяем.
       * Добавляем условие, чтобы не могли выделять вражеские фигуры.
       * Если цвет фигуры и цвет игрока совпадают, то в таком случае ячейку с фигурами текущего игрока можно выделять.
       */
      if (cell.figure?.color === currentPlayer?.color) {
        // Изменяем состояние с помощью функции setSelectedCell и передаём аргументом ячейку
        setSelectedCell(cell);
      }
    }
  }

  useEffect(() => {
    // Вызываем метод highlightCells
    highlightCells();
    // В массив зависимостей передаём selectedCell
  }, [selectedCell]);

  // Создаём функцию для подсветки доступных ячеек
  function highlightCells() {
    // Внутри функции вызываем метод у объекта доски
    board.highlightCells(selectedCell);
    // Вызываем функцию updateBoard
    updateBoard();
  }

  // Создаём функцию для обновления состояния 
  function updateBoard() {
    // Создаём новый объект и копируем существующую доску для того, чтобы была новая ссылка и при изменении состояния React перерисовал новую доску
    const newBoard = board.getCopyBoard();
    // Вызываем функцию setBoard для изменения состояния и передаём новую доску
    setBoard(newBoard);
  }

  return (
    /*
     * Выводим заголовок с наименованием текущего игрокаю, где в скобках указываем его цвет.
     * Достаём саму доску и функцию, способную изменить board.
     * Далее отрисовываем ячейки.
     * С помощью функции map проходимся по двумерному массиву.
     * Поскольку массив двумерный, каждым элементом массива является другой массив, и это непосредственно массив ячеек.
     * Используем React.Fragment и в качестве ключа используем index.
     * Поскольку row - это массив, по нему так же с помощью функции map итерируемся.
     * Для каждого элемента массива отрисовываем компонент ячейки.
     */
    <div>
    <h2>Текущий игрок (цвет фигур): {currentPlayer?.color} </h2>
      <div className="board">
        {board.cells.map((row, index) => (
          <React.Fragment key={index}>
            {row.map((cell) => (
              <CellComponent
              // Передаём функцию click в компонент ячейки
                click={click}
                // Передаём объект ячейки пропсом
                cell={cell}
                // Для элемента массива указываем ключ
                key={cell.id}
                // Передаём пропсом selected
                selected={
                  // Если текущая ячейка по координате x/y равняется координате x/y выбранной ячейки, то считаем, что ячейка выбран
                  cell.x === selectedCell?.x && cell.y === selectedCell?.y
                }
              />
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default BoardComponent;
