import { Component } from './Component.js';

export class GameStatistic extends Component {
    constructor(gameRaitingInfo) {
        super({
            srcIncorrect: gameRaitingInfo.incorrectStar,
            srcCorrect: gameRaitingInfo.correctStar,
            quantityOfCorrect: 0,
            quantityOfIncorrect: 0,
        });
    }

    updateStatistics(correctAnswers, incorrectAnswers) {
        this.setState({
            ...this.state, 
            quantityOfCorrect:  correctAnswers, 
            quantityOfIncorrect:  incorrectAnswers
        });
    }

    render() {
        let element = document.createElement('div');
        element.classList.add('raiting');

        element.innerHTML = `<img class="correct answer" src="${this.state.srcCorrect}" alt="Correct Answer Star"/> <span>${this.state.quantityOfCorrect}</span>
        <img class="incorrect answer" src="${this.state.srcIncorrect}" alt="Correct Answer Star"/> <span>${this.state.quantityOfIncorrect}</span>`;
        
        return element;
    }
}