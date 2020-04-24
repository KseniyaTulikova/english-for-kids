import { Game } from './Game.js';
import { Component } from './Component.js';
import { StudyStatistic } from './StudyStatistic.js';


export class GameBoard extends Component {
    constructor(listOfGames) {
        let games = listOfGames.map(game => new Game(game));
        super({
            games: games,
            selectedGame: null,
            showStatistic: null,  
        });

        listOfGames.forEach((game) => this.setTrainingInfo(game));

        this.isPlayMode = false;
        this.state.games.forEach((game) => game.setGameBoard(this));
        
    }

    setTrainingInfo(game) {
        let gameTheme = game.themeValue;
        game.gameCards.forEach((gameCard) => {
            sessionStorage.setItem(`${gameCard.wordEn}`, JSON.stringify({
                'gameTheme': gameTheme,
                'wordRu': gameCard.wordRu,
                'training': 0,
                'failed': 0,
                'passed': 0
            }));
        });

    }
    toggleMode() {
        this.isPlayMode = !this.isPlayMode;
        this.state.games.forEach(game => game.toggleMode());

        if(this.state.selectedGame != null) {
            this.rootElement.querySelector('.btns').classList.toggle('none');
        }
    }

    showHomePage() {
        if(this.state.selectedGame != null) {
            this.state.selectedGame.setSelected('gameCover');
        }
            this.setState({...this.state, selectedGame: null, showStatistic: null});    
    }

    showStatisticPage(value) {
        if(this.state.selectedGame != null) {
            this.state.selectedGame.setSelected('gameCover');
        }
        this.setState({...this.state, selectedGame: null, showStatistic: value});
    }

    selectGame(gameTheme) {
        if(this.state.selectedGame != null) {
            this.state.selectedGame.setSelected('gameCover');
        }
        
        let selectedGame = this.state.games.find(game => game.getGameTheme() == gameTheme);
        selectedGame.setSelected('cards');

        this.setState({ ...this.state, selectedGame: selectedGame });
    }

    getGameThemes() {
       return this.state.games.map(game => game.getGameTheme());
    }

    render() {
        let gameBoard = document.createElement('div');

        if(this.state.selectedGame != null) {
            gameBoard.append(this.state.selectedGame.htmlElement);

            let startGameBtnDisplayState = (this.isPlayMode) ? '' : 'none';
            gameBoard.insertAdjacentHTML('beforeend', `<div class="btns ${startGameBtnDisplayState}">
                    <button class="btn">Start game</button>
                </div>`);
        }else if(this.state.showStatistic !=null){
            gameBoard.append(this.state.showStatistic.htmlElement);
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
                    selectedGame.setSelected('cards'); //to do

                    this.setState({ ...this.state, selectedGame: selectedGame });
                }
            });    
        } else if(this.state.selectedGame != null) {
            this.rootElement.querySelector('.btns').addEventListener('click', (event) => {
                if(!event.target.classList.contains('repeat')) {
                    event.target.classList.add('repeat');
                    this.state.selectedGame.start();
                }else{
                    this.state.selectedGame.repeatSound();
                }
                
            });
            
        }
    }
}

