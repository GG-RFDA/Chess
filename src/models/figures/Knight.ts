import { Figure, FigureNames } from "./Figure";
import { Colors } from "../Colors";
import { Cell } from "../Cell";
// Импортируем иконки коня
import blackLogo from "../../assets/black-knight.png";
import whiteLogo from "../../assets/white-knight.png";

// Создаём класс для коня
export class Knight extends Figure {
  // Создаём конструктор и закладываем логику по аналогии с предыдущими фигурами
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FigureNames.KNIGHT;
  }

  // Вызываем метод canMove
  canMove(target: Cell): boolean {
    // Вызываем метод canMove у родительского класса, т.е. figure
    if(!super.canMove(target))
    return false;
    /*
     * Посчитаем разницу для x.
     * Берём с помощью abs модуль, отнимаем от текущей координаты x координату target.
     */
    const dx = Math.abs(this.cell.x - target.x);
    // Проделываем те же самые действия для y
    const dy = Math.abs(this.cell.y - target.y);
    // Проверяем смещение на 2 по 1 оси и 1 по 2
    return (dx === 1 && dy ===2) || (dx === 2 && dy === 1)
  }
}
