import {Colors} from "./Colors";

// Создаём класс Player 
export class Player {
  // Передаём в класс цвета, чтобы в дальнейшем помечать игроков
  color: Colors;
  
  constructor(color: Colors) {
    this.color = color;
  }
}