import { Component } from './Component.js';

export class GameStatistic extends Component {
    constructor(gameRaitingInfo) {
        super({
            srcIncorrect: gameRaitingInfo.incorrectStar,
            srcCorrect: gameRaitingInfo.correctStar,
            quantityOfCorrect: 0,
            quantityOfIncorrect: 0,
            visible: false,
        });
    }

    updateStatistics(correctAnswers, incorrectAnswers) {
        this.setState({
            ...this.state, 
            quantityOfCorrect:  correctAnswers, 
            quantityOfIncorrect:  incorrectAnswers
        });
    }

    getQuantityOfCorrect () {
        return this.state.quantityOfCorrect;
    }

    getQuantityOfIncorrect () {
        return this.state.quantityOfIncorrect;
    }

    setVisibility(value) {
        this.setState({
            ...this.state, 
            visible: value
        });
    }

    render() {
        let element = document.createElement('div');
        let elementClasses = this.state.visible ? ['raiting'] : ['raiting', 'none'];
        element.classList.add(...elementClasses);

        element.innerHTML = `<img class="correct answer" src="${this.state.srcCorrect}" alt="Correct Answer Star"/> <span>${this.state.quantityOfCorrect}</span>
        <img class="incorrect answer" src="${this.state.srcIncorrect}" alt="Correct Answer Star"/> <span>${this.state.quantityOfIncorrect}</span>`;
        
        return element;
    }
}