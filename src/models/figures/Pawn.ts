import { Figure, FigureNames } from "./Figure";
import { Colors } from "../Colors";
import { Cell } from "../Cell";
// Импортируем иконки пешки
import blackLogo from "../../assets/black-pawn.png";
import whiteLogo from "../../assets/white-pawn.png";

// Создаём класс для пешки
export class Pawn extends Figure {
  // По этому условию будем определять, на сколько шагов вперёд пешка может походить, т.к. первый ход пешка может сделать либо на 1 шаг, либо на 2
  isFirstStep: boolean = true;
  // Создаём конструктор и закладываем логику по аналогии с предыдущими фигурами
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FigureNames.PAWN;
  }

  // Вызываем метод canMove
  canMove(target: Cell): boolean {
    if (!super.canMove(target)) return false;
    // Определяем, в каком направлении двигаются пешки с тем или иным цветом
    const direction = this.cell.figure?.color === Colors.BLACK ? 1 : -1;
    // Создаём похожую переменную для первого шага
    const firstStepDirection =
      this.cell.figure?.color === Colors.BLACK ? 2 : -2;
    /*
     * Проверяем смещение по y на 1 или 2, если это первый шаг.
     * Проверяем, что смещение идет по одной полосе x, т.е. мы не ходим влево или вправо.
     * Убедимся, что ячейка, на которую хотим перейти, пустая.
     */
    if (
      (target.y === this.cell.y + direction ||
        (this.isFirstStep && target.y === this.cell.y + firstStepDirection)) &&
      target.x === this.cell.x &&
      this.cell.board.getCell(target.x, target.y).isEmpty()
    ) {
      return true;
    }
    /*
     * Создаём условие для атаки по диагонали.
     * Проверяем, что двигаемся по направлению на 1 ячейку либо вверх, либо вниз, в зависимости от цвета.
     * Смещаемся по диагонали, по x на 1 ячейку.
     * Проверяем, что на ячейке стоит враг.
     */
    if (
      target.y === this.cell.y + direction &&
      (target.x === this.cell.x + 1 || target.x === this.cell.x - 1) &&
      this.cell.isEnemy(target)) {
      return true;
    }

    return false;
  }
  // Вызываем метод moveFigure
  moveFigure(target: Cell): void {
    super.moveFigure(target);
    // После передвиижения фигуры меняем значение boolean на false
    this.isFirstStep = false;
  }
}
