import Component from './Component';
import GameCard from './GameCard';
import GameStatistic from './GameStatistic';
import Play from './Play';

export default class Game extends Component {
  constructor(game) {
    const GAME_CARDS = game.gameCards.map((card) => new GameCard(card));
    const GAME_STATISTIC = new GameStatistic(
      { correctStar: game.correctStar, incorrectStar: game.incorrectStar },
    );
    super({
      gameTheme: game.themeValue,
      gameSrc: game.src,
      gameCards: GAME_CARDS,
      correctSound: game.correctSound,
      incorrectSound: game.incorrectSound,
      winSound: game.winSound,
      failureSound: game.failureSound,
      currentRender: 'gameCover',
      gameStatistic: GAME_STATISTIC,
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
    this.setState({ ...this.state, currentRender: 'gameResult' });
    this.state.gameStatistic.setVisibility(false);
    setTimeout(() => this.gameBoard.showHomePage(), 5000);
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
    let ELEMENT;
    let GAME_INFO;
    switch (this.state.currentRender) {
      case 'cards': {
        ELEMENT = document.createElement('div');
        ELEMENT.classList.add('container');

        GAME_INFO = document.createElement('div');
        GAME_INFO.classList.add('gameInfo');
        GAME_INFO.insertAdjacentElement('afterbegin', this.state.gameStatistic.htmlElement);
        GAME_INFO.insertAdjacentHTML('afterbegin', `<h2 class="selected-game-theme funny-title">${this.state.gameTheme}</h2>`);

        ELEMENT.append(GAME_INFO);

        this.state.gameCards.forEach((card, index) => {
          card.setDataAttribute('cardIndex', index);
          ELEMENT.append(card.htmlElement);
        });

        break;
      }
      case 'gameResult': {
        const ERRORS = this.state.gameStatistic.getQuantityOfIncorrect();
        const CORRECT_ANSWERS = this.state.gameStatistic.getQuantityOfCorrect();

        const TEXT = (ERRORS > 0) ? `Sorry, you  have ${ERRORS} errors!` : 'My congratulations, you WIN the game!';
        ELEMENT = document.createElement('div');
        ELEMENT.classList.add('gameResult');
        ELEMENT.innerHTML = `<h2>${TEXT}</h2>
                <h2>Errors: ${ERRORS}</h2>
                <h2>Correct answers:  ${CORRECT_ANSWERS}</h2>`;
        break;
      }
      case 'gameCover': {
        ELEMENT = document.createElement('a');
        const ELEMENT_CLASSES = this.isPlayMode ? ['game-theme'] : ['game-theme', 'green'];
        ELEMENT.classList.add(...ELEMENT_CLASSES);
        ELEMENT.innerHTML = `<img src = "${this.state.gameSrc}" alt = "${this.state.gameTheme}">${this.state.gameTheme}`;
        break;
      }
      default:
    }

    return ELEMENT;
  }

  getGameTheme() {
    return this.state.gameTheme;
  }

  setSelected(value) {
    this.setState({ ...this.state, currentRender: value });
  }

  setListeners() {
    if (this.state.currentRender === 'cards') {
      this.rootElement.addEventListener('click', (event) => {
        const CARD = event.target.closest('.card');
        if (CARD != null && !this.isPlayMode) {
          this.state.gameCards[CARD.dataset.cardIndex].setInfoClick('training');
          this.state.gameCards[CARD.dataset.cardIndex].play();
        } else if (CARD != null && this.play != null) {
          this.play.setAnswer(this.state.gameCards[CARD.dataset.cardIndex]);
        }
      });
    }
  }


  toggleMode() {
    this.isPlayMode = !this.isPlayMode;
    this.state.gameCards.forEach((gameCard) => gameCard.toggleMode());
    this.rootElement.classList.toggle('green');
  }
}
