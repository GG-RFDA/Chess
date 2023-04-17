import { Colors } from "./Colors";
import { Figure } from "./figures/Figure";
import { Board } from "./Board";
// Экспортируем и создаём класс ячейки
export class Cell {
  // Задаём координаты и прописываем св-во readonly
  readonly x: number;
  readonly y: number;
  // Задаём цвет, передаём Colors и прописываем св-во readonly
  readonly color: Colors;
  // Свойство figure может принимать либо какую-то фигуру, либо null, если ячейка пустая
  figure: Figure | null;
  board: Board;
  // Свойство будет равно true, если выбранная фигура может походить на ячейку, и false, когда не может
  available: boolean;
  // Это нужно для React ключей
  id: number;
  // Создаём конструктор
  constructor(
    // Первым аргументом принимаем доску, на которой находится ячейка
    board: Board,
    // Принимаем x и y координаты
    x: number,
    y: number,
    // Принимаем цвет
    color: Colors,
    // Принимаем фигуру, которая будет стоять на ячейке
    figure: Figure | null
  ) {
    // Инициализируем все св-ва объекта
    this.x = x;
    this.y = y;
    this.color = color;
    this.figure = figure;
    this.board = board;
    // По умолчанию св-во равно false
    this.available = false;
    // id получаем в результате операции Math.random()
    this.id = Math.random()
  }

  // Создаём метод isEmpty
  isEmpty(): boolean {
    // Если фигура у текущей ячейки не равна null, то возвращаем true
    return this.figure === null;
  }
  
  // Создаём метод isEnemy и передаём туда target
  isEnemy(target: Cell): boolean {
    if (target.figure) {
      // Если на target ячейке есть фигура, то проверяем её цвет фигуры с цветом фигуры, которая стоит на текущей ячейке
      return this.figure?.color !== target.figure.color;
    }
    // Если условие не соблюдается, возвращаем false
    return false;
  }

  // Создаём метод, проверяющий пустые клетки по вертикали, принимающий аргументом ячейку и возвращающий boolean флаг
  isEmptyVertical(target: Cell): boolean {
    // Создаём условие, где проверяем совпадение координат текущей ячейки и target-ячейки
    if (this.x !== target.x) {
      // Если не совпадают, то возвращаем false
      return false;
    }
    // Получаем минимальные и максимальные координаты для текущей ячейки и target-ячейки при помощи функций min и max
    const min = Math.min(this.y, target.y);
    const max = Math.max(this.y, target.y);
    /*
     * В цикле проходимся по диапазону клеток, т.е. от минимального + 1 до максимального.
     * Проходимся от минимального + 1 потому, что минимальное значениие - это координата текущей клетки и на неё не можем походить.
     */
    for (let y = min + 1; y < max; y++) {
      // В условии получаем ячейку по x координате и индексу y, а затем вызываем метод isEmpty
      if (!this.board.getCell(this.x, y).isEmpty()) {
        // Если ячейка не пустая, то возвращаем false
        return false
      }
    }
    return true;
  }

  // Создаём метод, проверяющий пустые клетки по горизонтали, принимающий аргументом ячейку и возвращающий boolean флаг
  isEmptyHorizontal(target: Cell): boolean {
    // Логика будет схожа с методом isEmptyVertical, поскольку требуется заменить y на x, т.к. проверка уже идёт по горизлнтали
    if (this.y !== target.y) {
      return false;
    }

    const min = Math.min(this.x, target.x);
    const max = Math.max(this.x, target.x);
    for (let x = min + 1; x < max; x++) {
      // В условии получаем ячейку по индексу x и координате y, а затем вызываем метод isEmpty
      if (!this.board.getCell(x, this.y).isEmpty()) {
        return false
      }
    }
    return true;
  }
  
  // Создаём метод, проверяющий пустые клетки по диагонали, принимающий аргументом ячейку и возвращающий boolean флаг
  isEmptyDiagonal(target: Cell): boolean {
    // С помощью функции abs берём модуль
    const absX = Math.abs(target.x - this.x);
    const absY = Math.abs(target.y - this.y);
    // Если разница по x и по y не совпадает, то возвращаем false
    if (absY !== absX) return false;
    /*
     * Далее необходимо получить направление, по которому фигура хочет двигаться.
     * Создаём проверку: если координата по y текущей проверки меньше, чем координата точки, в которую хотим попасть, то присваиваем либо 1, либо (-1).
     */
    const dy = this.y < target.y ? 1 : -1
    const dx = this.x < target.x ? 1 : -1
    // В цикле двигается на столько ячеек, сколько получили модуль разницы
    for (let i = 1; i < absY; i++) {
      /*
       * Создаём очередное условие.
       * Получаем ячейку.
       * По x получаем значение следующим образом: к текущей координате прибавляем произведение dx, умноженного на индекс.
       * Таким образом, мы получаем направление движения.
       * Если в отрицательную сторону, то умножаем на -1 и получаем x - индекс.
       * В обратном случае x + индекс.
       * То же самое делаем с y.
       * Если ячейки по диагонали непустые, возвращаем false.
       */
      if (!this.board.getCell(this.x + dx * i, this.y + dy * i).isEmpty())
        return false;
    }
    // В обратном случае возвращаем true
    return true;
  }

  // Создаём метод, проверяющий пустые клетки по вертикали для короля, принимающий аргументом ячейку и возвращающий boolean флаг
  isEmptyVerticalKing(target: Cell): boolean {
    // Переносим то же самое условие, что и в методе isEmptyVertical
    if (this.x !== target.x) {
      return false;
    }
    // Производим расчёт хода и берём модуль
    const distance = Math.abs(this.y - target.y);
    // Если длина хода больше 1 клетки, то возвращаем false
    if (distance > 1) {
      return false;
    }
    // В обратном случае возвращаем true
    return true;
  }

  // Создаём метод, проверяющий пустые клетки по горизонтали для короля, принимающий аргументом ячейку и возвращающий boolean флаг
  isEmptyHorizontalKing(target: Cell): boolean {
    // Переносим то же самое условие, что и в методе isEmptyHorizontal
    if (this.y !== target.y) {
      return false;
    }
    // По аналогии с предыдущим методом рассчитываем длину хода
    const distance = Math.abs(this.x - target.x);
    if (distance > 1) {
      return false;
    }

    return true;
  }

  // Создаём метод, проверяющий пустые клетки по диагонали для короля, принимающий аргументом ячейку и возвращающий boolean флаг
  isEmptyDiagonalKing(target: Cell): boolean {
    // Производим те же расчёты, что и в методе isEmptyDiagonal
    const absX = Math.abs(target.x - this.x);
    const absY = Math.abs(target.y - this.y);
    // Создаём условие, где проверяем длину хода
    if (absY > 1 || absX > 1 || absY !== absX) {
      // Если длина хода больше 1 клетки, и разница по x и по y не совпадает, то возвращаем false
      return false;
    }
    // В обратном случае возвращаем true
    return true;
  }

  // Создаём отдельный метод setFigure, принимающий аргументом фигуру
  setFigure(figure: Figure) {
    // Для текущей ячейки меняем фигуру
    this.figure = figure;
    // У ячейки, на которую смотрит эта фигура, меняем её на this
    this.figure.cell = this;
  }

  // Создаём метод addLostFigure, принимающий аргументом фигуру
  addLostFigure(figure: Figure) {
    // Если это чёрная фигура, то добавляем её в массив чёрных фигур lostBlackFigures
    figure.color === Colors.BLACK
    ? this.board.lostBlackFigures.push(figure)
    // В обратном случае добавляем в массив белых фигур lostWhiteFigures
    : this.board.lostWhiteFigures.push(figure)
  }

  // Создаём метод moveFigure и принимаем аргументом target, т.е. ячейку, на которую мы хотим переместить фигуру
  moveFigure(target: Cell) {
    // Если есть фигура, и у фигуры метод canMove возвращает true, то тогда перемещаем фигуру
    if (this.figure && this.figure?.canMove(target)) {
      // У самой фигуры вызываем метод moveFigure, куда передаём target ячейку, на которую хотим переместить фигуру
      this.figure.moveFigure(target)
      // Добавляем условие и проверяем, стояла ли на ячейке какая-то фигура
      if(target.figure) {
        // Внутри условия вызываем метод addLostFigure
        this.addLostFigure(target.figure);
      }
      // После чего удаляем фигуру с текущей ячейки и добавляем её на target ячейку
      target.setFigure(this.figure);
      this.figure = null;
    }
  }
}
