import React, { FC, useEffect, useRef, useState } from "react";
import { Colors } from "../models/Colors";
import { Player } from "../models/Player";
import "../../src/App.css";

// Создаём интерфейс TimerProps, где принимаем пропсами текущего игрока и функцию restart
interface TimerProps {
  currentPlayer: Player | null;
  restart: () => void;
}

// Указываем, что это функциональный компонент, и передаём пропсы
const Timer: FC<TimerProps> = ({ currentPlayer, restart }) => {
  // Создаём состояния для оставшегося времени Игрока 1 и Игрока 2
  const [blackTime, setBlackTime] = useState(3600);
  const [whiteTime, setWhiteTime] = useState(3600);
  /*
   * Создаём переменную, где по интервалу будем отнимать 1 либо у Игрока 1, либо у Игрока 2.
   * Делаем reference, где будем сохранять сам интервал, т.е. сам таймер.
   * В качестве типа в этом ref будет храниться либо null, либо тип, возвращающий функцию setInterval.
   * setInterval будет использован для того, чтобы декремнтировать таймер.
   */
  const timer = useRef<null | ReturnType<typeof setInterval>>(null);

  useEffect(() => {
    // Таймер будет стартовать в useEffect
    startTimer();
  }, [currentPlayer]);

  // Создаём функцию startTimer, внутри которой будем таймер запускать
  function startTimer() {
    // Создаём проверку
    if (timer.current) {
      // Если в поле timer.current что-то есть, отличное от null, тогда интервал будем очищать, чтобы не декрементировать таймер уже для сделавшего ход игрока
      clearInterval(timer.current);
    }
    // Определяем коллбэк, который будет задаваться по условию
    const callback =
    // Если цвет текущего игрока - белый, то это будет коллбэк decrementWhiteTimer
      currentPlayer?.color === Colors.WHITE
        ? decrementWhiteTimer
        // В обратном случае будет коллбэк decrementBlackTimer
        : decrementBlackTimer;
        // Затем в поле current будем присваивать интервал, где будем передавать коллбэк и вызывать его раз в 1000 миллисекунд
    timer.current = setInterval(callback, 1000);
  }

  // Создаём функцию decrementBlackTimer, внутри которой будем декрементировать на 1 таймер для игрока с чёрными фигурами
  function decrementBlackTimer() {
    // Изменяем значение состояния, т.е. от предыдущего значения отнимаем 1
    setBlackTime((prev) => prev - 1);
  }

  // Создаём функцию decrementBlackTimer, внутри которой будем декрементировать на 1 таймер для игрока с белыми фигурами
  function decrementWhiteTimer() {
    // Делаем то же самое, что и в предыдущей функции
    setWhiteTime((prev) => prev - 1);
  }
  
  // Создаём функцию HandleRestart для обнуления таймеров
  const HandleRestart = () => {
    // Устанавливаем значения таймеров для игроков по умолчанию (1 час)
    setWhiteTime(3600);
    setBlackTime(3600);
    // Вызываем коллбэк restart
    restart();
  };

  return (
    /*
     * На корневой блок вешаем стилевой класс parameters.
     * Внутри блока div создаём кнопку, где вешаем слушатель событий и передаём функцию HandleRestart.
     * Затем указываем в заголовках имена игроков с оставшимся временем при помощи соответсвующих переменных.
     */
    <div className="parameters">
      <div>
        <button onClick={HandleRestart} className="button">
          Начать партию заново
        </button>
      </div>
      <h2>Игрок 1 - {blackTime} секунд(ы)</h2>
      <h2>Игрок 2 - {whiteTime} секунд(ы)</h2>
    </div>
  );
};

export default Timer;
