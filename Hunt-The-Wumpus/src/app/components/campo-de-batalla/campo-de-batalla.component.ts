import { Component, OnInit } from '@angular/core';
import { empty } from 'rxjs';

@Component({
  selector: 'app-campo-de-batalla',
  templateUrl: './campo-de-batalla.component.html',
  styleUrls: ['./campo-de-batalla.component.css'],
})
export class CampoDeBatallaComponent implements OnInit {
  columnas = 5;
  filas = this.columnas;
  monsters = 2;
  holes = 3;
  finish = false;
  win = false;
  gamePlay = false;
  gameMenu = true;
  playerMessage = false;
  lingoteAtrapado = false;
  rightRotation = 0;
  leftRotation = 0;
  imagen = document.querySelector('#player');
  message = document.querySelectorAll('#player-message');

  tablero = Array(this.filas)
    .fill('')
    .map(() => Array(this.columnas).fill('empty'));
  posicionJugador: any = {
    fila: 0,
    columna: 0,
  };

  constructor() {}
  ngOnInit(): void {
    this.message = this.message;
    console.log(this.tablero);
    console.log('mensaje', this.message);
  }

  public reset() {
    console.log('imagen', this.imagen);
    this.gameMenu = false;
    this.gamePlay = true;
    this.finish = false;
    this.filas = this.columnas;
    this.tablero = Array(this.filas)
      .fill('')
      .map(() => Array(this.columnas).fill('empty'));
    this.lingoteAtrapado = false;
    console.log('lingote inicio ', this.lingoteAtrapado);

    this.tablero[this.filas - 1][0] = 'player';

    if (this.lingoteAtrapado === false) {
      const position = this.getRandomPosition();
      this.tablero[position.fila][position.columna] = 'lingote';
    }

    for (let i = 0; i < this.monsters; i++) {
      const position = this.getRandomPosition();
      this.tablero[position.fila][position.columna] = 'monster';
    }
    for (let i = 0; i < this.holes; i++) {
      const position = this.getRandomPosition();
      this.tablero[position.fila][position.columna] = 'hole';
    }

    console.log('tablero despues de reseteo', this.tablero);
    console.log(this.getPlayer());
  }

  public rotationToRight() {
    this.rightRotation = +1;
    console.log('rotationrigth', this.rightRotation);
  }

  public rotationToLeft() {
    this.leftRotation = +1;
    console.log('rotationrigth', this.leftRotation);
  }

  /* Función para desplazar el jugador hacia abajo */
  private moveTo(fila: number, columna: number) {
    /* Le restamos 1 posición */
    if (this.tablero[fila][columna] === 'empty') {
      this.tablero[this.posicionJugador.fila][this.posicionJugador.columna] =
        'empty';
      this.tablero[fila][columna] = 'player';
    } else if (this.tablero[fila][columna] === 'lingote') {
      this.tablero[fila][columna] = 'empty';
      this.tablero[fila][columna] = 'player';
      this.tablero[this.posicionJugador.fila][this.posicionJugador.columna] =
        'empty';
      this.lingoteAtrapado = true;
      console.log('Lingote', this.lingoteAtrapado);
    } else if (
      this.lingoteAtrapado == true &&
      this.tablero[this.filas - 1][0] == 'player'
    ) {
      console.log(this.lingoteAtrapado);
      this.getPlayer();
      this.gamePlay = false;
      this.finish = true;
      this.win = true;
    } else if (
      this.tablero[fila][columna] === 'monster' ||
      this.tablero[fila][columna] === 'hole'
    ) {
      this.gamePlay = false;
      this.finish = true;
      this.win = false;
    }
    this.getPlayer();

    console.log('tablero..', this.tablero);
  }

  public moveUp() {
    this.moveTo(this.posicionJugador.fila - 1, this.posicionJugador.columna);
  }

  public moveDown() {
    this.moveTo(this.posicionJugador.fila + 1, this.posicionJugador.columna);
  }

  public moveLeft() {
    this.moveTo(this.posicionJugador.fila, this.posicionJugador.columna - 1);
  }

  public moveRight() {
    this.moveTo(this.posicionJugador.fila, this.posicionJugador.columna + 1);
  }

  public getPlayer() {
    for (let i = 0; i < this.tablero.length; i++) {
      for (let j = 0; j < this.tablero[i].length; j++) {
        if (this.tablero[i][j] === 'player') {
          this.posicionJugador = { fila: i, columna: j };
        }
      }
    }
  }

  public gameSettings() {
    this.gameMenu = true;
    this.gamePlay = false;
    this.finish = false;
  }

  getRandomInt = (max: number) => {
    return Math.floor(Math.random() * max);
  };

  public getRandomPosition(): { fila: number; columna: number } {
    const fila = this.getRandomInt(this.filas);
    const columna = this.getRandomInt(this.columnas);
    if (this.tablero[fila][columna] !== 'empty') {
      return this.getRandomPosition();
    }

    return { fila: fila, columna: columna };
  }
}

/* 
  document.getElementById(input).addListener('keypress', (e: KeyboardEvent) =>{
    //You have yout key code here
     console.log(e.keyCode);
 }
}
} */
