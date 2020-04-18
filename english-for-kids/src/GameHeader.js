import { Component } from "./Component.js";

export class GameHeader extends Component {
    constructor(gameBoard){
        super({gameBoard: gameBoard});
    }
    
    render() {
        let gameHeader = document.createElement('div');
        gameHeader.classList.add('header-container');

        let gameLinks = this.state.gameBoard.getGameThemes()
            .map(theme => `<a class="header-item" data-game-theme= "${theme}" href="#/cards">${theme}</a>`)
            .join('');

        gameHeader.innerHTML = `
        <div class="burger-container">
            <img src="../img/menu.svg" class="burger-menu" alt="Burger menu"> 
        </div>
        <section class="game-menu">
            <nav class="menu green">
                <ul class="menu-list ">
                    <a class="header-item main-page" href="#/">Main Page</a>
                    ${gameLinks}
                </ul>
            </nav>
        </section>
        
        <div class="switch-container">
            <label class="switch">
                <input type="checkbox" class="switch-input" checked>
                <span class="switch-label" data-on="Train" data-off="Play"></span>
                <span class="switch-handle"></span>
            </label>
        </div>`;
        
        return gameHeader;
    }

    setListeners() {
        this.rootElement.querySelector('.switch-input').addEventListener('click', () => {
            this.state.gameBoard.toggleMode();
        });

        this.rootElement.querySelector('.burger-menu').addEventListener('click', () => {
            this.toggleNavigationButton();
            this.toggleNavigationMenu();
        });

        this.rootElement.querySelector('.menu').addEventListener('click', (e) => {
            if(event.target.classList.contains('main-page')) {
                this.toggleNavigationButton();
                this.toggleNavigationMenu();
                this.state.gameBoard.showHomePage();
            } else {
                this.toggleNavigationButton();
                this.toggleNavigationMenu();

                let gameTheme = event.target.dataset.gameTheme;
                this.state.gameBoard.selectGame(gameTheme);
            }
        });
    }

    toggleNavigationMenu() {
        this.rootElement.querySelector('.game-menu').classList.toggle('game-menu-active');
    }

    toggleNavigationButton() {
        this.rootElement.querySelector('.burger-menu').classList.toggle('burger-menu-rotate');
    }
}