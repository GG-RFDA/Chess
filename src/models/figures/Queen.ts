import { Figure, FigureNames } from "./Figure";
import { Colors } from "../Colors";
import { Cell } from "../Cell";
// Импортируем иконки ферзя
import blackLogo from "../../assets/black-queen.png";
import whiteLogo from "../../assets/white-queen.png";
// Создаём класс Queen
export class Queen extends Figure {
  // Создаём конструктор и закладываем логику по аналогии с предыдущими фигурами
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FigureNames.QUEEN;
  }
  
  // Вызываем метод canMove
  canMove(target: Cell): boolean {
    // Вызываем метод canMove у родительского класса, т.е. figure
    if (!super.canMove(target)) return false;
    // Создаём проверку, где вызываем необходимые методы, передаём target-ячейки и в случаях, если они пустые, возвращаем  true
    if (this.cell.isEmptyVertical(target)) return true;
    if (this.cell.isEmptyHorizontal(target)) return true;
    if (this.cell.isEmptyDiagonal(target)) return true;
    // Во всех обратных случаях возвращаем false
    return false
  }
}
