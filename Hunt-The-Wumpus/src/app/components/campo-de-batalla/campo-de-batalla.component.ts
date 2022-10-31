import { Component, OnInit } from '@angular/core';
import { TitleStrategy } from '@angular/router';
import { empty } from 'rxjs';

@Component({
  selector: 'app-campo-de-batalla',
  templateUrl: './campo-de-batalla.component.html',
  styleUrls: ['./campo-de-batalla.component.css'],
})
export class CampoDeBatallaComponent implements OnInit {
  columnas = 5;
  filas = this.columnas;
  monsters = 1;
  arrows = 5;
  holes = 3;
  finish = false;
  win = false;
  ingotMessage = false;
  gamePlay = false;
  gameMenu = true;
  playerMessage = false;
  lingoteAtrapado = false;
  rotation: any = 0;
  monsterMessage = false;
  arrowMessage = false;

  tablero = Array(this.filas)
    .fill('')
    .map(() => Array(this.columnas).fill('empty'));

  posicionJugador: any = {
    fila: 0,
    columna: 0,
  };

  posicionMonster: any = {
    fila: 0,
    columna: 0,
  };

  posicionLingote: any = {
    fila: 0,
    columna: 0,
  };
  constructor() {}
  ngOnInit(): void {}

  /* reset the table and his values,generating random positions */
  public reset() {
    this.playerMessage = false;
    this.gameMenu = false;
    this.gamePlay = true;
    this.finish = false;
    this.rotation = 0;
    this.win = false;
    this.filas = this.columnas;
    this.tablero = Array(this.filas)
      .fill('')
      .map(() => Array(this.columnas).fill('empty'));
    this.lingoteAtrapado = false;

    this.tablero[this.filas - 1][0] = 'player';

    if (this.lingoteAtrapado === false) {
      const position = this.getRandomPosition();
      this.tablero[position.fila][position.columna] = 'lingote';
    }
    this.getLingote();

    for (let i = 0; i < this.monsters; i++) {
      const position = this.getRandomPosition();
      this.tablero[position.fila][position.columna] = 'monster';
    }

    for (let i = 0; i < this.holes; i++) {
      const position = this.getRandomPosition();
      this.tablero[position.fila][position.columna] = 'hole';
    }

    this.getPlayer();
    this.getMonster();
  }

  /* Control function for the player movements*/
  private moveTo(fila: number, columna: number) {
    if (this.tablero[fila][columna] === 'empty') {
      /* all the variables set to initial value */
      this.ingotMessage = false;
      this.playerMessage = false;
      this.monsterMessage = false;
      this.arrowMessage = false;
      this.tablero[this.posicionJugador.fila][this.posicionJugador.columna] =
        'empty';
      this.tablero[fila][columna] = 'player';
    } else if (this.tablero[fila][columna] === 'lingote') {
      this.tablero[fila][columna] = 'empty';
      this.tablero[fila][columna] = 'player';
      this.tablero[this.posicionJugador.fila][this.posicionJugador.columna] =
        'empty';
      this.lingoteAtrapado = true;
      this.ingotMessage = true;
    } else if (
      this.tablero[fila][columna] === 'monster' ||
      this.tablero[fila][columna] === 'hole'
    ) {
      this.gamePlay = false;
      this.finish = true;
    }
    /* Check theese two conditions to win the game */
    if (
      this.lingoteAtrapado === true &&
      this.tablero[this.filas - 1][0] === 'player'
    ) {
      this.gamePlay = false;
      this.finish = true;
      this.win = true;
    }
    /* Shows an advice when the monster is close */
    if (
      this.tablero[this.posicionMonster.fila][
        this.posicionMonster.columna + 1
      ] === 'player' ||
      this.tablero[this.posicionMonster.fila][
        this.posicionMonster.columna - 1
      ] === 'player'
    ) {
      this.playerMessage = true;
    }
    this.getMonster();
    this.getPlayer();
  }

  public posicion() {
    return 'transform: rotate(' + this.rotation + 'deg)';
  }
  /* Functions to set the player directions and rotations*/

  public moveUp() {
    if (this.rotation === -90) {
      this.moveTo(this.posicionJugador.fila - 1, this.posicionJugador.columna);
    } else {
      this.rotation = -90;
    }
  }

  public moveDown() {
    if (this.rotation === 90) {
      this.moveTo(this.posicionJugador.fila + 1, this.posicionJugador.columna);
    } else {
      this.rotation = 90;
    }
  }

  public moveLeft() {
    if (this.rotation === -180) {
      this.moveTo(this.posicionJugador.fila, this.posicionJugador.columna - 1);
    } else {
      this.rotation = -180;
    }
  }

  public moveRight() {
    if (this.rotation === 0) {
      this.moveTo(this.posicionJugador.fila, this.posicionJugador.columna + 1);
    } else {
      this.rotation = 0;
    }
  }

  /* if this 2 conditions are true, the monster will die */

  public throwArrow() {
    if (this.arrows > 0) {
      if (
        this.rotation === 0 &&
        this.posicionMonster.fila === this.posicionJugador.fila &&
        this.posicionMonster.columna > this.posicionJugador.columna
      ) {
        this.tablero[this.posicionMonster.fila][this.posicionMonster.columna] =
          'empty';
        this.monsterMessage = true;
      }
      if (
        this.rotation === 90 &&
        this.posicionMonster.columna === this.posicionJugador.columna &&
        this.posicionMonster.fila > this.posicionJugador.fila
      ) {
        this.tablero[this.posicionMonster.fila][this.posicionMonster.columna] =
          'empty';
        this.monsterMessage = true;
      }
      if (
        this.rotation === -180 &&
        this.posicionMonster.fila === this.posicionJugador.fila &&
        this.posicionMonster.columna < this.posicionJugador.columna
      ) {
        this.tablero[this.posicionMonster.fila][this.posicionMonster.columna] =
          'empty';
        this.monsterMessage = true;
      }
      if (
        this.rotation === -90 &&
        this.posicionMonster.columna === this.posicionJugador.columna &&
        this.posicionMonster.fila < this.posicionJugador.fila
      ) {
        this.tablero[this.posicionMonster.fila][this.posicionMonster.columna] =
          'empty';
        this.monsterMessage = true;
      }
      this.arrows--;
    }
    if (this.arrows === 0) {
      this.arrowMessage = true;
    }
  }

  /* fuction to get the element position */

  public getPlayer() {
    for (let i = 0; i < this.tablero.length; i++) {
      for (let j = 0; j < this.tablero[i].length; j++) {
        if (this.tablero[i][j] === 'player') {
          this.posicionJugador = { fila: i, columna: j };
        }
      }
    }
  }

  public getLingote() {
    for (let i = 0; i < this.tablero.length; i++) {
      for (let j = 0; j < this.tablero[i].length; j++) {
        if (this.tablero[i][j] === 'lingote') {
          this.posicionLingote = { fila: i, columna: j };
        }
      }
    }
  }

  public getMonster() {
    for (let i = 0; i < this.tablero.length; i++) {
      for (let j = 0; j < this.tablero[i].length; j++) {
        if (this.tablero[i][j] === 'monster') {
          this.posicionMonster = { fila: i, columna: j };
        }
      }
    }
  }

  /* Activation of Settings view */

  public gameSettings() {
    this.gameMenu = true;
    this.gamePlay = false;
    this.finish = false;
  }

  /* Theese two functions will generate random */

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
