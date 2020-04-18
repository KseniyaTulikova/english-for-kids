import { Component } from './Component.js';
import { GameCard } from './GameCard.js';

export class Game extends Component {
    constructor(game) {
        let gameCards = (game.gameCards != null) ? game.gameCards.map(card => new GameCard(card)) : [];
        super({
            gameTheme: game.themeValue, 
            gameSrc: game.src,
            gameCards: gameCards,
            isSelected: false,
        });

        this.isPlayMode = false;
        this.setSelected = this.setSelected.bind(this);
    }

    render() {
        let element;
        if(this.state.isSelected) {
            element = document.createElement('div'); 
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
                if (card != null) {
                    this.state.gameCards[card.dataset.cardIndex].play();
                }
            });

            this.rootElement.addEventListener('click', (event) => {
                let card = event.target.closest('.card');
                if (card != null) {
                    this.state.gameCards[card.dataset.cardIndex].play();
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

