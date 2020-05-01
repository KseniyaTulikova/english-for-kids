import Component from './Component';
import StatisticRow from './StatisticRow';

export default class StudyStatistic extends Component {
  constructor() {
    super({ words: null });
    this.setState({ words: StudyStatistic.getStatisticFromStorage() });
  }


  static getStatisticFromStorage() {
    const KEYS = Object.keys(sessionStorage);

    return KEYS.map((key) => new StatisticRow(JSON.parse(sessionStorage[key]), key));
  }

  render() {
    const ELEMENT = document.createElement('div');
    ELEMENT.classList.add('study-statistic');

    ELEMENT.innerHTML = `<div class="header-row">
            <div class="cell">
                <h4>Word</h4>
                <div class="sort"> 
                    <img class="sorter-img" data-sort-property="wordEn" data-sort-flag="asc" src="./img/sortTop.svg"/>
                    <img class="sorter-img" data-sort-property="wordEn" data-sort-flag="dsc" src="./img/sortBottom.svg"/>
                </div>
            </div>
            <div class="cell">
                <h4>Translation</h4>
            </div>
            <div class="cell">
                <h4>Game Theme</h4>
            </div>
            <div class="cell">
                <h4>Training</h4>
                <div class="sort"> 
                    <img  class="sorter-img" data-sort-property="training" data-sort-flag="asc" src="./img/sortTop.svg"/>
                    <img class="sorter-img" data-sort-property="training" data-sort-flag="dsc" src="./img/sortBottom.svg"/>
                </div>
            </div>
            <div class="cell">
                <h4>Failed</h4>
                <div class="sort"> 
                    <img  class="sorter-img" data-sort-property="failed" data-sort-flag="asc" src="./img/sortTop.svg"/>
                    <img class="sorter-img" data-sort-property="failed" data-sort-flag="dsc" src="./img/sortBottom.svg"/>
                </div>
            </div>
            <div class="cell">
                <h4>Passed</h4>
                <div class="sort"> 
                    <img  class="sorter-img" data-sort-property="passed" data-sort-flag="asc" src="./img/sortTop.svg"/>
                    <img class="sorter-img" data-sort-property="passed" data-sort-flag="dsc" src="./img/sortBottom.svg"/>
                </div>
            </div>
            <div class="cell">
                <h4>Passing Percent</h4>
            </div>
        </div>`;

    if (this.state.words != null) {
      this.state.words.forEach((word) => ELEMENT.append(word.htmlElement));
    }

    return ELEMENT;
  }

  static compare(fieldName, a, b) {
    const first = a[fieldName].toString(); const
      second = b[fieldName].toString();

    return first.localeCompare(second);
  }

  sortStatistic(property, flag) {
    const WORDS = [...this.state.words];
    switch (flag) {
      case 'asc': {
        WORDS.sort((a, b) => StudyStatistic.compare(property, a, b));
        break;
      }
      case 'dsc': {
        WORDS.sort((a, b) => -StudyStatistic.compare(property, a, b));
        break;
      }
      default:
    }

    this.setState({ words: WORDS });
  }

  setListeners() {
    this.rootElement.addEventListener('click', (event) => {
      const { sortProperty } = event.target.dataset;
      const { sortFlag } = event.target.dataset;
      this.sortStatistic(sortProperty, sortFlag);
    });
  }
}
