import React, { FC } from "react";
import { Figure } from "../models/figures/Figure";

// Создаём интерфейс LostFiguresProps и описываем пропсы
interface LostFiguresProps {
  title: string;
  // figures - это массив фигур
  figures: Figure[];
}

// Укажем, что это функциональный компонент, и принимаем пропсами title и figures
const LostFigures: FC<LostFiguresProps> = ({ title, figures }) => {
  return (
    // На корневой блок вешаем стилевой класс lost
    <div className="lost">
      <h3>{title}</h3>
      {figures.map((figure) => (
        // Для каждой фигуры будем отрисовывать блок div и вешаем ключ
        <div key={figure.id}>
          {figure.name} {figure.logo && <img width={20} height={20} src={figure.logo} />}
        </div>
      ))}
    </div>
  );
};

export default LostFigures;
