
export default class Play {
  constructor(game, gameStatistic) {
    this.game = game;
    this.gameStatistic = gameStatistic;
    this.cardsForGame = [...this.game.getCards()];
    Play.shuffle(this.cardsForGame);
    this.cardsForGame[0].play();

    this.quantityOfCorrect = 0;
    this.quantityOfIncorrect = 0;
  }

  static shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }

  repeatSound() {
    this.cardsForGame[0].play();
  }

  setAnswer(answerCard) {
    if (answerCard === this.cardsForGame[0]) {
      this.cardsForGame[0].setInfoClick('passed');
      this.game.playCorrectSound();
      answerCard.makeInactive();
      this.quantityOfCorrect += 1;

      this.cardsForGame.shift();

      if (this.cardsForGame.length == 0 && this.quantityOfIncorrect > 0) {
        this.game.playFailureSound();
        this.quantityOfCorrect = 0;
        this.quantityOfIncorrect = 0;
        this.game.finishGame();
      } else if (this.cardsForGame.length == 0) {
        this.game.playWinSound();
        this.quantityOfCorrect = 0;
        this.quantityOfIncorrect = 0;
        this.game.finishGame();
      } else {
        setTimeout(() => this.cardsForGame[0].play(), 1000);
      }
    } else if (!answerCard.htmlElement.classList.contains('card-out-game')) {
      this.cardsForGame[0].setInfoClick('failed');
      this.game.playIncorrectSound();
      this.quantityOfIncorrect += 1;
    }

    this.gameStatistic.updateStatistics(this.quantityOfCorrect, this.quantityOfIncorrect);
  }
}
