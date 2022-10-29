import { Component, OnInit } from '@angular/core';
import { empty } from 'rxjs';

@Component({
  selector: 'app-campo-de-batalla',
  templateUrl: './campo-de-batalla.component.html',
  styleUrls: ['./campo-de-batalla.component.css'],
})
export class CampoDeBatallaComponent implements OnInit {
  filas = 5;
  columnas = 8;
  monsters = 2;
  pozos = 3;

  tablero = Array(this.filas)
    .fill('')
    .map(() => Array(this.columnas).fill('empty'));
  posicionJugador: any = {
    fila: 0,
    columna: 0,
  };

  /*  */
  getPlayer = () => {};

  constructor() {}
  ngOnInit(): void {
    this.getPlayer = () => {
      for (let i = 0; i < this.tablero.length; i++) {
        for (let j = 0; j < this.tablero[i].length; j++) {
          if (this.tablero[i][j] === 'player') {
            this.posicionJugador = { fila: i, columna: j };
          }
        }
      }

      console.log('posicionJugador :', this.posicionJugador);
    };

    console.log(this.tablero);
  }

  public reset() {
    this.tablero = Array(this.filas)
      .fill('')
      .map(() => Array(this.columnas).fill('empty'));
    this.tablero[this.filas - 1][0] = 'player';

    const position = this.getRandomPosition();
    this.tablero[position.fila][position.columna] = 'lingote';

    for (let i = 0; i < this.monsters; i++) {
      const position = this.getRandomPosition();
      this.tablero[position.fila][position.columna] = 'monster';
    }
    for (let i = 0; i < this.pozos; i++) {
      const position = this.getRandomPosition();
      this.tablero[position.fila][position.columna] = 'hole';
    }

    console.log('tablero despues de reseteo', this.tablero);
    console.log(this.getPlayer());
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

  /* Función para desplazar el jugador hacia abajo */
  private moveTo(fila: number, columna: number) {
    /* Le restamos 1 posición */
    if (this.tablero[fila][columna] === 'empty') {
      this.tablero[fila][columna] = 'player';
      this.tablero[this.posicionJugador.fila][this.posicionJugador.columna] =
        'empty';
      this.getPlayer();
    } else if (this.tablero[fila][columna] === 'monster') {
      alert('estas muerto');
    } else if (this.tablero[fila][columna] === 'hole') {
      alert('estas muerto');
    }
    console.log('hacia arriba');
    console.log(this.tablero);
  }

  /* FUNCIONES DEL EJERCICIO */

  /* Función para obtener número aleatorio. La utilizaremos para ordenar a los personajes cada partida */
  /* The above code is creating a function that will move the player up, down, right, and left. */
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
