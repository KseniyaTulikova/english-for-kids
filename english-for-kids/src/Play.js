
export class Play {
    constructor(game, gameStatistic) {
        this.game = game;
        this.gameStatistic = gameStatistic;
        this.cardsForGame = [...this.game.getCards()];
        this.shuffle(this.cardsForGame);
        this.cardsForGame[0].play();

        this.quantityOfCorrect = 0;
        this.quantityOfIncorrect = 0;

    }

    shuffle(array) {
        array.sort(() => Math.random() - 0.5);
    }

    repeatSound() {
        this.cardsForGame[0].play();
    }

    setAnswer(answerCard) {
        if(answerCard == this.cardsForGame[0]) {

            this.game.playCorrectSound();
            answerCard.makeInactive();
            this.quantityOfCorrect++;
            
            this.cardsForGame.shift();
    
            if(this.cardsForGame.length == 0 && this.quantityOfIncorrect > 0) {
                this.game.playFailureSound();
                this.quantityOfCorrect = this.quantityOfIncorrect = 0;
                this.game.finishGame();

            } else if(this.cardsForGame.length == 0) {
                this.game.playWinSound();
                this.quantityOfCorrect = this.quantityOfIncorrect = 0;
                this.game.finishGame();
            } else {
                setTimeout(() => this.cardsForGame[0].play(), 1000);
            }

        } else{
            if(!answerCard.rootElement.classList.contains('card-out-game')) { //incorrect condition
                this.game.playIncorrectSound();
                this.quantityOfIncorrect++;
            }
            
        }

        this.gameStatistic.updateStatistics(this.quantityOfCorrect, this.quantityOfIncorrect);
    }
}