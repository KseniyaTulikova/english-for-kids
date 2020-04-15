import { GameBoard } from './GameBoard.js';
import { GAME_THEMES } from './gameThemes.js';


window.onload = () => {
 let game = new GameBoard(GAME_THEMES);
 game.htmlElement.addEventListener('click', () => {change(game)});

 document.body.append(game.htmlElement);

 
}

let change = (gaa) => {
    gaa.state.games.forEach(elem => {
        elem.htmlElement.classList.toggle('green');
    });
}
