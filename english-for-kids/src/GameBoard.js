import { Game } from './Game.js';
import { Component } from './Component.js';

export class GameBoard extends Component {
    constructor(gameThemes) {
        let games = gameThemes.map(theme => new Game(theme));
        super({games: games});
    }

    render() {
        let gameBoard = document.createElement('div');
        gameBoard.className = 'games-board';
        // console.log(this.state.themes);
        // this.state.games = [];
        // this.state.themes.forEach(theme => {
        //     let game = new Game(theme);
        //     this.state.games.push(game);
        //     gameBoard.append(game.htmlElement);
        // });
        this.state.games.forEach(game => gameBoard.append(game.htmlElement));

        return gameBoard;
    }



    // reverse() {
    //     this.setState({...this.state, isReversed: true});
    // }

}

