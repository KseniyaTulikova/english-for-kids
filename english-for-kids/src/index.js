import { GameBoard } from './GameBoard.js';
import { GAMES } from './games.js';
import { GameHeader } from './GameHeader.js';


window.onload = () => {

 let gameBoard = new GameBoard(GAMES);
 let gameHeader = new GameHeader(gameBoard);
 
//  game.htmlElement.addEventListener('click', () => {change(game)});

 document.body.append(gameHeader.htmlElement, gameBoard.htmlElement);


 
}

let change = (gaa) => {
    gaa.state.games.forEach(elem => {
        elem.htmlElement.classList.toggle('green');
    });
}
