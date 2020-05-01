import Component from './Component';
import StudyStatistic from './StudyStatistic';

export default class GameHeader extends Component {
  constructor(gameBoard) {
    super({ gameBoard });
  }

  render() {
    const GAME_HEADER = document.createElement('div');
    GAME_HEADER.classList.add('header-container');

    const GAME_LINKS = this.state.gameBoard.getGameThemes()
      .map((theme) => `<a class="header-item" data-game-theme= "${theme}" href="#/">${theme}</a>`)
      .join('');

    GAME_HEADER.innerHTML = `
        <div class="burger-container">
            <img src="./img/menu.svg" class="burger-menu" alt="Burger menu"> 
        </div>
        <section class="game-menu">
            <nav class="menu green">
                <ul class="menu-list ">
                    <a class="header-item main-page" href="#/">Main Page</a>
                    ${GAME_LINKS}
                    <a class="header-item study-statistic-page" href="#/">Statistics</a>
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

    return GAME_HEADER;
  }

  setListeners() {
    this.rootElement.querySelector('.switch-input').addEventListener('click', () => {
      this.state.gameBoard.toggleMode();
    });

    this.rootElement.querySelector('.burger-menu').addEventListener('click', () => {
      this.toggleNavigationButton();
      this.toggleNavigationMenu();
    });

    this.rootElement.querySelector('.menu').addEventListener('click', (event) => {
      if (event.target.classList.contains('main-page')) {
        this.toggleNavigationButton();
        this.toggleNavigationMenu();
        this.state.gameBoard.showHomePage();
      } else if (event.target.classList.contains('study-statistic-page')) {
        this.toggleNavigationButton();
        this.toggleNavigationMenu();
        this.state.gameBoard.showStatisticPage(new StudyStatistic());
      } else {
        this.toggleNavigationButton();
        this.toggleNavigationMenu();

        const { gameTheme } = event.target.dataset;
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
