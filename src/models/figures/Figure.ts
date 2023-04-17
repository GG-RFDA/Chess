import { Colors } from "../Colors";
import { Cell } from "../Cell";
import logo from "../../assets/black-king.png";
// Создаём класс названий фигур и перечисляем все необходимые названия
export enum FigureNames {
  FIGURE = "Фигура",
  KING = "Король",
  KNIGHT = "Конь",
  PAWN = "Пешка",
  QUEEN = "Ферзь",
  ROOK = "Ладья",
  BISHOP = "Слон",
}
// Создаём класс фигур
export class Figure {
  // Передаём цвет
  color: Colors;
  // Передаём логотип и делаем typeof от того объекта, который импортировали
  logo: typeof logo | null;
  // Создаём кольцевую зависимость, т.е. фигура знает про ячейку, на которой она стоит, и ячейка знает про фигуру
  cell: Cell;
  // Передаём названия фигур
  name: FigureNames;
  // Генерирум id, чтобы его использовать в качестве ключа в дальнейшем
  id: number;
  // Создаём конструктор
  constructor(color: Colors, cell: Cell) {
    this.color = color;
    this.cell = cell;
    // На ячейку сразу добавляем фигуру в качестве текущего объекта
    this.cell.figure = this;
    // Поскольку это базовый класс, и логотипа явно нет, делаем его null
    this.logo = null;
    // Указываем название фигуры
    this.name = FigureNames.FIGURE;
    // Проинициализируем id и генерируем его при помощи функиции Math.random()
    this.id = Math.random();
  }
  /*
   * Создаём метод, сообщающий о том, может ли двигаться фигура на ячейку или нет.
   * В качестве аргумента метод будет принимать target ячейку, на которую мы хотим переместиться.
   * Возращать будет boolean-значение: либо true, либо false.
   */
  canMove(target: Cell): boolean {
    // Создаём условие на проверку цвета фигуры, т.к. свои же фигуры есть нельзя
    if (target.figure?.color === this.color) return false
    // Создаём условие на съедение короля, т.к. короля съесть тоже не можем
    if (target.figure?.name === FigureNames.KING) return false
    // В обратном случае возвращаем true
    return true;
  }
  // Добавим метод moveFigure, с помощью которого будем перемещать фигуры
  moveFigure(target: Cell) {}
}
