import { Component } from "./Component.js";
import { StatisticRow } from "./StatisticRow.js";

export class StudyStatistic extends Component {
    constructor() {
        super({words: null});
        this.setState({words: this.getStatisticFromStorage()});
    }


    getStatisticFromStorage() {
        let keys = Object.keys(sessionStorage);

        return keys.map(key => new StatisticRow(JSON.parse(sessionStorage[key]), key)); 
    }

    render() {
        let element = document.createElement('div');
        element.classList.add('study-statistic');

        element.innerHTML = `<div class="header-row">
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

        if(this.state.words != null) {
            this.state.words.forEach(word => element.append(word.htmlElement));
        } 

        return element;
    }

    compare(fieldName, a, b) {
        let first = a[fieldName].toString(), second = b[fieldName].toString();

        return first.localeCompare(second);
    }

    sortStatistic(property, flag) {
        let words = [...this.state.words];
        switch(flag){  
            case 'asc': {     
                words.sort((a, b) => this.compare(property, a, b));
                break;
            }
            case 'dsc': {
                words.sort((a, b) => -this.compare(property, a, b));
                break;
            }
            default:
        }

        this.setState({words: words});
    }
    setListeners() {
        this.rootElement.addEventListener('click', (event)=>{
            let sortProperty = event.target.dataset.sortProperty;
            let sortFlag = event.target.dataset.sortFlag;
            this.sortStatistic(sortProperty, sortFlag);
        });
    }
}