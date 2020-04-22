import { Component } from './Component.js';
import { GameCard } from './GameCard.js';
import { GameStatistic } from './GameStatistic.js';
import { Play } from './Play.js';

export class Game extends Component {
    constructor(game) {
        let gameCards = game.gameCards.map(card => new GameCard(card));
        let gameStatistic = new GameStatistic({correctStar: game.correctStar, incorrectStar: game.incorrectStar});
        super({
            gameTheme: game.themeValue, 
            gameSrc: game.src,
            gameCards: gameCards,
            correctSound: game.correctSound,
            incorrectSound: game.incorrectSound,
            winSound: game.winSound,
            failureSound: game.failureSound,
            currentRender: 'gameCover',
            gameStatistic: gameStatistic,
        });

        this.isPlayMode = false;
        this.setSelected = this.setSelected.bind(this);
        this.start = this.start.bind(this);
        this.gameBoard = null;
    }

    setGameBoard(gameBoard) {
        this.gameBoard = gameBoard;
    }

    start() {
        this.state.gameStatistic.setVisibility(true);
        this.play = new Play(this, this.state.gameStatistic);
    }

    getCards() {
       return this.state.gameCards;
    }

    repeatSound() {
        this.play.repeatSound(); 
    }

    finishGame() {
        this.state.gameCards.forEach((card) => card.makeActive());
        this.setState({...this.state, currentRender: 'gameResult'});
        this.state.gameStatistic.setVisibility(false);
        
        setTimeout(() => this.gameBoard.showHomePage(), 3000);
    }

    playCorrectSound() {
        new Audio(this.state.correctSound).play();
    }

    playIncorrectSound() {
        new Audio(this.state.incorrectSound).play();
    }

    playWinSound() {
        new Audio(this.state.winSound).play();
    }

    playFailureSound() {
        new Audio(this.state.failureSound).play();
    }

    render() {
        let element, gameInfo;
        switch(this.state.currentRender) {
            case 'cards': {
                element = document.createElement('div');
                element.classList.add('container');

                gameInfo = document.createElement('div');
                gameInfo.classList.add('gameInfo');
                gameInfo.insertAdjacentElement('afterbegin', this.state.gameStatistic.htmlElement);
                gameInfo.insertAdjacentHTML('afterbegin', `<h2 class="selected-game-theme">${this.state.gameTheme}</h2>`);

                element.append(gameInfo);

                this.state.gameCards.forEach((card, index) => {
                    card.setDataAttribute('cardIndex', index);
                    element.append(card.htmlElement)
                });

                break;
            }
            case 'gameResult': {

                let errors = this.state.gameStatistic.getQuantityOfIncorrect();
                let correctAnswers = this.state.gameStatistic.getQuantityOfCorrect()

                let text = (errors > 0) ? `Sorry, you  have ${errors} errors!` : 'My congratulations, you WIN the game!' ;
                element = document.createElement('div');
                element.classList.add('gameResult');
                element.innerHTML = `<h2>${text}</h2>
                <h2>Errors: ${errors}</h2>
                <h2>Correct answers:  ${correctAnswers}</h2>`;
                break;
            }
            case 'gameCover': {
                element = document.createElement('a');
                let elementClasses = this.isPlayMode ? ['game-theme'] : ['game-theme', 'green'];
                element.classList.add(...elementClasses);
                element.innerHTML = `<img src = "${this.state.gameSrc}" alt = "${this.state.gameTheme}">${this.state.gameTheme}`;
                break;
            }
            default:
        }

        return element;
    }

    getGameTheme() {
        return this.state.gameTheme;
    }

    setSelected(value) {
        // let currentRender = value ? 'cards' : 'gameCover';
        this.setState({...this.state, currentRender: value});
    }

    setListeners() {
        if (this.state.currentRender == 'cards') {
            this.rootElement.addEventListener('click', (event) => {
                let card = event.target.closest('.card');
                if (card != null && !this.isPlayMode) {
                    this.state.gameCards[card.dataset.cardIndex].play();
                } else if(card != null && this.play != null) {
                    this.play.setAnswer(this.state.gameCards[card.dataset.cardIndex]);
                }
            });
        } 
    }

    toggleMode() {
        this.isPlayMode = !this.isPlayMode;
        this.state.gameCards.forEach(gameCard => gameCard.toggleMode());
        this.rootElement.classList.toggle('green');
    }
}

