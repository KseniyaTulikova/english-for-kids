import Component from './Component';

export default class GameStatistic extends Component {
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
      quantityOfCorrect: correctAnswers,
      quantityOfIncorrect: incorrectAnswers,
    });
  }

  getQuantityOfCorrect() {
    return this.state.quantityOfCorrect;
  }

  getQuantityOfIncorrect() {
    return this.state.quantityOfIncorrect;
  }

  setVisibility(value) {
    this.setState({
      ...this.state,
      visible: value,
    });
  }

  render() {
    const ELEMENT = document.createElement('div');
    const elementClasses = this.state.visible ? ['raiting'] : ['raiting', 'none'];
    ELEMENT.classList.add(...elementClasses);

    ELEMENT.innerHTML = `<img class="correct answer" src="${this.state.srcCorrect}" alt="Correct Answer Star"/> <span>${this.state.quantityOfCorrect}</span>
        <img class="incorrect answer" src="${this.state.srcIncorrect}" alt="Correct Answer Star"/> <span>${this.state.quantityOfIncorrect}</span>`;

    return ELEMENT;
  }
}
