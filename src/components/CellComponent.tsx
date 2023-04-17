import React, {FC} from 'react';
import {Cell} from "../models/Cell";
// Создаём интерфейс
interface CellProps {
  // На вход ожидаем компонент ячейки
  cell: Cell
  // Здесь передаём boolean флаг, который будет отвечать за то, выбрана ячейка или нет
  selected: boolean;
  // Указываем пропсом, что ожидаем функцию click, где функция принимает аргументом объект типа класса Cell и ничего не возвращает
  click: (cell: Cell) => void;
}
// Указываем, что это функциональный компонент, и в качестве дженерика передаём CellProps
const CellComponent: FC<CellProps> = ({cell, selected, click}) => {
    return (
      /*
       * Проверяем наличие фигуры на ячейке. Если есть, то отрисовываем.
       * В компоненте ячейки отрисовываем иконку фигуры, где задаём проверку на существование фигуры и достаём св-во logo.
       * Добавляем условие: если на ячейке нет фигуры, и ячейка является доступной, то подсвечиваем соответствующим цветом.
       */
        <div
         /*
          * На корневой блок div вешаем cell, получаем цвет и используем метод join для объединения классов в одну строку.
          * Если ячейка выбрана, то подсвечиваем её соответствующим цветом.
          */
          className={['cell', cell.color, selected ? "selected" : ''].join(' ')}
          // Вешаем слушатель событий, где с помощью стрелочной функции вызываем функцию click и передаём ячейку
          onClick={() => click(cell)}
          // Подсвечиваем доступную для атаки ячейку
          style={{background: cell.available && cell.figure ? 'green' : ''}}
        >
          {cell.available && !cell.figure && <div className={"available"}/>}
          {cell.figure?.logo && <img src={cell.figure.logo} alt=""/>}
        </div>
    );
};

export default CellComponent;