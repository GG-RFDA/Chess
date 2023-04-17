import { Figure, FigureNames } from "./Figure";
import { Colors } from "../Colors";
import { Cell } from "../Cell";
// Импортируем иконки слона
import blackLogo from "../../assets/black-bishop.png";
import whiteLogo from "../../assets/white-bishop.png";

// Создаём класс для слона
export class Bishop extends Figure {
  // Реализуем конструктор
  constructor(color: Colors, cell: Cell) {
    // Вызов конструктора родительского класса, где родительский класс - это Figure 
    super(color, cell);
    // Указываем иконку и создаём проверку, где в зависимости от цвета фигуры будет определяться цвет иконки
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    // Указываем название фигуры
    this.name = FigureNames.BISHOP;
  }

  // Вызываем метод canMove
  canMove(target: Cell): boolean {
    // Вызываем метод canMove у родительского класса, т.е. figure
    if (!super.canMove(target)) return false;
    // Создаём проверку, где вызываем метод isEmptyDiagonal, передаём target-ячейку и в случае, если она пустая, возвращаем  true
    if (this.cell.isEmptyDiagonal(target)) return true
    // В обратном случае возвращаем false
    return false
  }
}
