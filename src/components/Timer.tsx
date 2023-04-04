import React, { FC, useEffect, useRef, useState } from 'react';
import { Colors } from '../models/Colors';
import {Player} from "../models/Player";
import "../../src/App.css";

interface TimerProps {
    currentPlayer: Player | null;
    restart: () => void;
}

const Timer: FC<TimerProps> = ({currentPlayer, restart}) => {
    const [blackTime, setBlackTime] = useState(3600)
    const [whiteTime, setWhiteTime] = useState(3600);
    const timer = useRef<null | ReturnType<typeof setInterval>>(null)

    useEffect(() => {
        startTimer()
    }, [currentPlayer])

    function startTimer() {
      if (timer.current) {
        clearInterval(timer.current)
      }
      const callback = currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer
      timer.current = setInterval(callback, 1000)
    }
    function decrementBlackTimer() {
      setBlackTime(prev => prev - 1)
    }
    function decrementWhiteTimer() {
      setWhiteTime(prev => prev - 1)  
    }

    const HandleRestart = () => {
      setWhiteTime(3600)
      setBlackTime(3600)
      restart()
    }

    return (
        <div className="parameters">
            <div>
                <button onClick={HandleRestart} className="button">Начать партию заново</button>
            </div>
            <h2>Игрок 1 - {blackTime} секунд(ы)</h2>
            <h2>Игрок 2 - {whiteTime} секунд(ы)</h2>
        </div>
    )
}

export default Timer;