import {Cell} from "./Cell";
import {Colors} from "./Colors";
import { Bishop } from "./figures/Bishop";
import { Figure } from "./figures/Figure";
import { King } from "./figures/King";
import { Knight } from "./figures/Knight";
import { Pawn } from "./figures/Pawn";
import { Queen } from "./figures/Queen";
import { Rook } from "./figures/Rook";

export class Board {
  /*
   * Передаём Cell в класс.
   * Ячейки представляют из себя двумерный массив, т.е. строки и столбцы.
   */
    cells: Cell[][] = []
    // Создаём два поля со съеденными фигурами
    lostBlackFigures: Figure[] = []
    lostWhiteFigures: Figure[] = []
    // Создаём публичный метод
    public initCells() {
      // Проходим от 0 до 8 в цикле, согласно размерности доски
        for (let i = 0; i < 8; i++) {
          // Создаём переменную row, т.е. строку
            const row: Cell[] = []
            // Внутри цикла создаём второй цикл, т.к. проходимся по столбцам
            for (let j = 0; j < 8; j++) {
              /*
               * Организовываем добавление ячеек определённого цвета.
               * Задаём условие.
               */
              if ((i + j) % 2 !== 0) {
                // Аргументами передаём доску, x и y координаты, цвет и null в качестве фигуры
                // Чёрные ячейки
                row.push(new Cell(this, j, i, Colors.BLACK, null))
              } else {
                // Белые ячейки
                row.push(new Cell(this, j, i, Colors.WHITE, null))
              }
            }
            // После того, как в цикле сформировалась строка, добавляем её в двумерный массив Cells
            this.cells.push(row);
            /*
             * Далее прописано объяснение принципа работы ранее написанного кода.
             * Во внутреннем массиве формируем строку.
             * С каждой итерации добавляем ячейки, пока их не станет в строке 8 штук.
             * Затем во внешнем цикле получается заполненная строка.
             * Из этих строк формируем доску.
             * Получается доска 8x8 ячеек.
             * Получаем двумерный массив ячеек.
             */
        }
    }
    
    // Создаём метод getCopyBoard, возвращающий доску
    public getCopyBoard(): Board {
      // Создаём новый объект доски
      const newBoard = new Board();
      // Переносим текущие ячейки доски в новый объект
      newBoard.cells = this.cells;
      // Переносим съеденные фигуры в новые объекты
      newBoard.lostWhiteFigures = this.lostWhiteFigures
      newBoard.lostBlackFigures = this.lostBlackFigures
      // Возаращаем новую доску
      return newBoard;
    }

    // Создаём публичный метод, принимающий аргументом выбранную ячейку, чтобы для этой ячейки могли посчитать, куда фигура может ходить
    public highlightCells(selectedCell: Cell | null) {
      /*
       * Необходимо в цикле пройтись по всем ячейкам, чтобы понять, на какую из ячеек фигура может походить.
       * Поэтому создаём двумерный цикл, т.е. один цикл вложен в другой.
       * Здесь проходимся по строкам и столбцам.
       */
      for (let i = 0; i < this.cells.length; i++) {
        const row = this.cells[i];
        for (let j = 0; j <row.length; j++) {
          /*
           * Во внутреннем цикле по индексу получаем ячейку - target.
           * target потому, что потенциально туда может походить фигура.
           */
          const target = row[j];
          /*
           * Изменяем значение поля available, чтобы определить, доступна ли для хода или нет.
           * Получаем фигуру, которая стоит на выбранной ячейке, и вызываем метод canMove, возвращающий либо true, либо false.
           * В качестве ячейки, на которую хотим походить, передаём target.
           * С помощью 2-х восклицательных знаков преобразовываем значение к boolean флагу.
           */
          target.available = !!selectedCell?.figure?.canMove(target)
        }
      }
    }

    // Создаём метод, принимающий x и y координаты
    public getCell(x: number, y: number) {
      // Возвращаем соответствующий элемент из двумерного массива cells
      return this.cells[y][x]
    }
    // Создаём класс добавления фигуры "Пешка"
    public addPawns() {
      // Пешки добавлять будем в цикле
      for (let i=0; i<8; i++) {
        // В качестве x передаём i
        new Pawn(Colors.BLACK, this.getCell(i, 1))
        new Pawn(Colors.WHITE, this.getCell(i, 6))
      }
    }
    // Создаём класс добавления фигуры "Король"
    public addKings() {
      // Создаём new King, указываем цвета и при помощи метода getCell указываем ячейки, на которых должны размещаться фигуры
      new King(Colors.BLACK, this.getCell(4,0))
      new King(Colors.WHITE, this.getCell(4,7))
    }
    // Создаём класс добавления фигуры "Ферзь"
    public addQueens() {
      // По аналогии с предыдущей функцией
      new Queen(Colors.BLACK, this.getCell(3,0))
      new Queen(Colors.WHITE, this.getCell(3,7))
    }
    // Создаём класс добавления фигуры "Слон"
    public addBishops() {
      // По аналогии с предыдущей функцией
      new Bishop(Colors.BLACK, this.getCell(2,0))
      new Bishop(Colors.BLACK, this.getCell(5,0))
      new Bishop(Colors.WHITE, this.getCell(2,7))
      new Bishop(Colors.WHITE, this.getCell(5,7))
    }
    // Создаём класс добавления фигуры "Конь"
    public addKnights() {
      // По аналогии с предыдущей функцией
      new Knight(Colors.BLACK, this.getCell(1,0))
      new Knight(Colors.BLACK, this.getCell(6,0))
      new Knight(Colors.WHITE, this.getCell(1,7))
      new Knight(Colors.WHITE, this.getCell(6,7))
    }
    // Создаём класс добавления фигуры "Ладья"
    public addRooks() {
      // По аналогии с предыдущей функцией
      new Rook(Colors.BLACK, this.getCell(0,0))
      new Rook(Colors.BLACK, this.getCell(7,0))
      new Rook(Colors.WHITE, this.getCell(0,7))
      new Rook(Colors.WHITE, this.getCell(7,7))
    }

    // Создаём метод добавления фигур
    public addFigures() {
      this.addBishops()
      this.addKings()
      this.addKnights()
      this.addPawns()
      this.addQueens()
      this.addRooks()
    }
}