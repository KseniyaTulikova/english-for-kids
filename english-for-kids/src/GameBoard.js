import Game from './Game';
import Component from './Component';

export default class GameBoard extends Component {
  constructor(listOfGames) {
    const GAMES = listOfGames.map((game) => new Game(game));
    super({
      games: GAMES,
      selectedGame: null,
      showStatistic: null,
    });

    listOfGames.forEach((game) => GameBoard.setTrainingInfo(game));

    this.isPlayMode = false;
    this.state.games.forEach((game) => game.setGameBoard(this));
  }

  static setTrainingInfo(game) {
    const GAME_THEME = game.themeValue;
    game.gameCards.forEach((gameCard) => {
      sessionStorage.setItem(`${gameCard.wordEn}`, JSON.stringify({
        gameTheme: GAME_THEME,
        wordRu: gameCard.wordRu,
        training: 0,
        failed: 0,
        passed: 0,
      }));
    });
  }

  toggleMode() {
    this.isPlayMode = !this.isPlayMode;
    this.state.games.forEach((game) => game.toggleMode());

    if (this.state.selectedGame != null) {
      this.rootElement.querySelector('.btns').classList.toggle('none');
    }
  }

  showHomePage() {
    if (this.state.selectedGame != null) {
      this.state.selectedGame.setSelected('gameCover');
    }
    this.setState({ ...this.state, selectedGame: null, showStatistic: null });
  }

  showStatisticPage(value) {
    if (this.state.selectedGame != null) {
      this.state.selectedGame.setSelected('gameCover');
    }
    this.setState({ ...this.state, selectedGame: null, showStatistic: value });
  }

  selectGame(gameTheme) {
    if (this.state.selectedGame != null) {
      this.state.selectedGame.setSelected('gameCover');
    }

    const selectedGame = this.state.games.find((game) => game.getGameTheme() === gameTheme);
    selectedGame.setSelected('cards');

    this.setState({ ...this.state, selectedGame });
  }

  getGameThemes() {
    return this.state.games.map((game) => game.getGameTheme());
  }

  render() {
    const gameBoard = document.createElement('div');

    if (this.state.selectedGame != null) {
      gameBoard.append(this.state.selectedGame.htmlElement);

      const startGameBtnDisplayState = (this.isPlayMode) ? '' : 'none';
      gameBoard.insertAdjacentHTML('beforeend', `<div class="btns ${startGameBtnDisplayState}">
                    <button class="btn">Start game</button>
                </div>`);
    } else if (this.state.showStatistic != null) {
      gameBoard.append(this.state.showStatistic.htmlElement);
    } else {
      gameBoard.classList.add('container');
      this.state.games.forEach((game, index) => {
        // eslint-disable-next-line no-param-reassign
        game.htmlElement.dataset.gameIndex = index;
        gameBoard.append(game.htmlElement);
      });
    }

    return gameBoard;
  }

  setListeners() {
    if (this.state.selectedGame == null) {
      this.rootElement.addEventListener('click', (event) => {
        const game = event.target.closest('.game-theme');
        if (game != null) {
          const { gameIndex } = game.dataset;
          const SELECTED_GAME = this.state.games[gameIndex];
          SELECTED_GAME.setSelected('cards');

          this.setState({ ...this.state, selectedGame: SELECTED_GAME });
        }
      });
    } else if (this.state.selectedGame != null) {
      this.rootElement.querySelector('.btns').addEventListener('click', (event) => {
        if (!event.target.classList.contains('repeat')) {
          event.target.classList.add('repeat');
          this.state.selectedGame.start();
        } else {
          this.state.selectedGame.repeatSound();
        }
      });
    }
  }
}
