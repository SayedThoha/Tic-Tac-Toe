import { Injectable } from '@angular/core';
import { console } from 'inspector';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  public board: any = [];
  boardSize: number = 9;
  activePlayer: string = "X";
  turnCount: number = 0;
  isGameRunning: boolean = false;
  isGameOver: boolean = false;
  winner: boolean = false;

  constructor() {

    this.newGame()
  }
  newGame() {
    this.activePlayer = "X";
    this.turnCount = 0;
    this.isGameRunning = false;
    this.isGameOver = false;
    this.winner = false;
    this.board = this.createBoard()

  }

  createBoard() {
    let board = [];
    for (let i = 0; i < 9; i++) {
      board.push({ id: i, state: null })
    }
    return board;
  }

  get getBoard() {
    return this.board;
  }

  set setBoard(board: any) {
    board = [...board]
  }

  changePlayerTurn(squareClicked: any) {
    this.updateBoard(squareClicked);
    if (!this.isGameOver) {
      this.activePlayer = this.activePlayer === "X" ? "O" : "X"
    }

    this.turnCount++;
    this.isGameOver = this.isGameOver ? true : false;

  }

  updateBoard(squareClicked: any) {
    this.board[squareClicked.id].state = squareClicked.state;

    if (this.isWinner) {
      this.winner = true;
      this.isGameRunning = false;
      this.isGameOver = true
    }
  }

  get gameOver(): boolean {

    return this.turnCount > 8 || this.winner ? true : false;
  }

  get isWinner(): boolean {

    return this.checkDiag() || this.checkRows(this.board, "row") || this.checkRows(this.board, "col") ? true : false
  }

  checkRows(board: any, mode: any):boolean {

    const ROW = mode === "row" ? true : false;
    const DIST = ROW ? 1 : 3;
    const INC = ROW ? 3 : 1;
    const NUMTIMES = ROW ? 7 : 3;

    for (let i = 0; i < NUMTIMES; i += INC) {
      let firstSquare = board[i].state;
      let secondSquare = board[i + DIST].state;
      let thirdSquare = board[i + (DIST * 2)].state;

      if (firstSquare && secondSquare && thirdSquare) {
        if (firstSquare === secondSquare && secondSquare === thirdSquare) {
          return true;
        }
      }
    }
    return false;

  }


  checkDiag() {
    const timesRun = 2;
    const midSquare = this.board[4].state;

    for (let i = 0; i <= timesRun; i += 2) {
      let upperCorner = this.board[i].state;
      let loweCorner = this.board[8 - i].state;

      if (midSquare && upperCorner && loweCorner) {

        if (midSquare === upperCorner && upperCorner === loweCorner) {
          return true;
        }
      }
    }
    return false;
  }
}
