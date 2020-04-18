import { Game } from './Game.js';
import { Component } from './Component.js';
import { GameHeader } from './GameHeader.js';


export class GameBoard extends Component {
    constructor(listOfGames) {
        let games = listOfGames.map(game => new Game(game));
        super({
            games: games,
            selectedGame: null,  
        });
    }

    toggleMode() {
        this.state.games.forEach(game => game.toggleMode()); 
    }

    showHomePage() {
        this.state.selectedGame.setSelected(false);
        this.setState({...this.state, selectedGame: null});
    }

    selectGame(gameTheme) {
        let selectedGame = this.state.games.find(game => game.getGameTheme() == gameTheme);
        selectedGame.setSelected(true);

        this.setState({ ...this.state, selectedGame: selectedGame });
    }

    getGameThemes() {
       return this.state.games.map(game => game.getGameTheme());
    }

    render() {
        let gameBoard = document.createElement('div');

        if(this.state.selectedGame != null) {
            gameBoard.append(this.state.selectedGame.htmlElement);
        } else {
            gameBoard.classList.add('container'); 
            this.state.games.forEach((game, index) => {
                game.htmlElement.dataset.gameIndex = index;
                gameBoard.append(game.htmlElement);
            });
        }
         

        return gameBoard;
    }

    setListeners() {
        if(this.state.selectedGame == null) {
            this.rootElement.addEventListener('click', (event) => {
                let game = event.target.closest('.game-theme');
                if (game != null) {
                    let gameIndex = game.dataset.gameIndex;
                    let selectedGame = this.state.games[gameIndex];
                    selectedGame.setSelected(true);

                    this.setState({ ...this.state, selectedGame: selectedGame });
                }
            });    
        }
    }
}

