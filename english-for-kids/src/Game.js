import { Component } from './Component.js';
import { GameCard } from './GameCard.js';

export class Game extends Component {
    constructor(game) {
        let gameCards = game.gameCards.map(card => new GameCard(card));
        super({
            gameTheme: game.themeValue, 
            gameSrc: game.src,
            gameCards: gameCards,
            correctSound: game.correctSound,
            incorrectSound: game.incorrectSound,
            winSound: game.winSound,
            isSelected: false,
        });

        this.isPlayMode = false;
        this.cardsForGame = null;
        this.setSelected = this.setSelected.bind(this);
    }

    start() {
        this.cardsForGame = [...this.state.gameCards];
        this.shuffle(this.cardsForGame);
        this.cardsForGame[0].play();
    }

    repeatSound() {
        this.cardsForGame[0].play();
    }

    setAnswer(answerCard) {
        if(answerCard == this.cardsForGame[0]) {
            this.playSound(this.state.correctSound);
            this.makeActive();
            
            this.cardsForGame.shift();


            if(this.cardsForGame.length == 0) {
                this.playSound(this.state.winSound);
                this.makeInActive();//переделать метод нужен ререндер
            } else {
                setTimeout(() => this.cardsForGame[0].play(), 1000);
            }
        } else {
            this.playSound(this.state.incorrectSound);
        }
    }

    makeActive() {
        this.cardsForGame[0].makeActive();
    }

    makeInActive() {
        this.state.gameCards.forEach(game => game.makeInActive());
    }

    playSound (src) {
        new Audio(src).play();
    }

    shuffle(array) {
        array.sort(() => Math.random() - 0.5);
    }

    render() {
        let element;
        if(this.state.isSelected) {
            element = document.createElement('div'); 
            element.insertAdjacentHTML('afterbegin', `<h2 class="selected-game-theme">${this.state.gameTheme}</h2>`);
            element.classList.add('container');       
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

