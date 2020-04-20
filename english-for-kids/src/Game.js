import { Component } from './Component.js';
import { GameCard } from './GameCard.js';
import { GameStatistic } from './GameStatistic.js';

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
            isSelected: false,
            gameStatistic: gameStatistic,
        });

        this.isPlayMode = false;
        this.cardsForGame = null;
        this.setSelected = this.setSelected.bind(this);
        this.gameBoard = null;
        this.quantityOfCorrect = 0;
        this.quantityOfIncorrect = 0;
    }

    setGameBoard(gameBoard) {
        this.gameBoard = gameBoard;
    }

    start() {
        this.cardsForGame = [...this.state.gameCards];
        this.shuffle(this.cardsForGame);
        this.cardsForGame[0].play();
    }

    repeatSound() {
        this.cardsForGame[0].play();
    }

    exitGame() {
        this.setSelected(false);
        this.quantityOfCorrect = this.quantityOfCorrect = 0;
        this.state.gameCards.forEach((card) => card.makeActive());
        this.gameBoard.showHomePage();
    }

    // to do refactoring
    setAnswer(answerCard) {
        if(answerCard == this.cardsForGame[0]) {
            this.playSound(this.state.correctSound);
            answerCard.makeInactive();
            this.quantityOfCorrect++;
            
            this.cardsForGame.shift();
            this.state.gameStatistic.updateStatistics(this.quantityOfCorrect, this.quantityOfIncorrect);
    


            if(this.cardsForGame.length == 0 && this.quantityOfIncorrect > 0) {
                this.playSound(this.state.failureSound);
                this.exitGame();

            } else if(this.cardsForGame.length == 0) {
                this.playSound(this.state.winSound);
                this.exitGame();
            } else {
                setTimeout(() => this.cardsForGame[0].play(), 1000);
            }

        } else {
            this.playSound(this.state.incorrectSound);
            this.quantityOfIncorrect++;
        }
        this.state.gameStatistic.updateStatistics(this.quantityOfCorrect, this.quantityOfIncorrect);
    }

    playSound (src) {
        new Audio(src).play();
    }

    shuffle(array) {
        array.sort(() => Math.random() - 0.5);
    }

    render() {
        let element, gameInfo;
        if(this.state.isSelected) {
            element = document.createElement('div'); 
            element.classList.add('container');  

            gameInfo = document.createElement('div');
            gameInfo.classList.add('gameInfo');
            gameInfo.insertAdjacentElement('afterbegin', this.state.gameStatistic.htmlElement);
            gameInfo.insertAdjacentHTML('afterbegin', `<h2 class="selected-game-theme">${this.state.gameTheme}</h2>`);   
             
            element.append(gameInfo);

            this.state.gameCards.forEach((card, index)=> {
                card.setDataAttribute('cardIndex', index);
                element.append(card.htmlElement)
            });


        } else {
            element =  document.createElement('a');
            let elementClasses = this.isPlayMode ? ['game-theme'] : ['game-theme', 'green'];
            element.classList.add(...elementClasses);
            element.innerHTML = `<img src = "${this.state.gameSrc}" alt = "${this.state.gameTheme}">${this.state.gameTheme}`;
        }
        
        return element;
    }

    getGameTheme() {
        return this.state.gameTheme;
    }

    setSelected(value) {
        this.setState({...this.state, isSelected: value});
    }

    setListeners() {
        if (this.state.isSelected) {
            this.rootElement.addEventListener('click', (event) => {
                let card = event.target.closest('.card');
                if (card != null && !this.isPlayMode) {
                    this.state.gameCards[card.dataset.cardIndex].play();
                } else if(card != null && this.cardsForGame != null) {//incorrect condition
                    this.setAnswer(this.state.gameCards[card.dataset.cardIndex]);
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

