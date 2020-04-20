import { GameBoard } from './GameBoard.js';
import { GAMES } from './games.js';
import { GameHeader } from './GameHeader.js';


window.onload = () => {

 let gameBoard = new GameBoard(GAMES);
 let gameHeader = new GameHeader(gameBoard);

 document.body.append(gameHeader.htmlElement, gameBoard.htmlElement);
}
