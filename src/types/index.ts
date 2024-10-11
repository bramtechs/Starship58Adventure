export interface Position {
    x: number;
    y: number;
    rotation?: number
  }
  
  export interface Obstacle extends Position {
    rotation: number;
    dx: number;
    dy: number;
  }
  
  export interface GameState {
    rocket: Position;
    planetX: Position;
    earth: Position;
    obstacles: Obstacle[];
    oxygen: number;
    gameOver: boolean;
  }
  
  export interface Direction {
    x: number;
    y: number;
  }