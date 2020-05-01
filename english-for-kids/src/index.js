import GameBoard from './GameBoard';
import { GAMES } from './games';
import GameHeader from './GameHeader';


window.onload = () => {
  const gameBoard = new GameBoard(GAMES);
  const gameHeader = new GameHeader(gameBoard);

  document.body.append(gameHeader.htmlElement, gameBoard.htmlElement);
};
