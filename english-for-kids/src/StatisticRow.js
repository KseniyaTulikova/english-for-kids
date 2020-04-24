import { Component } from "./Component.js";

export class StatisticRow extends Component{
    constructor(wordInfo, wordEn) {
        super({
            wordEn: wordEn,
            wordRu: wordInfo.wordRu,
            gameTheme: wordInfo.gameTheme,
            failed: wordInfo.failed,
            passed: wordInfo.passed,
            training: wordInfo.training,
        });
    }

    get wordEn() {
        return this.state.wordEn;
    }

    get training() {
        return this.state.training;
    }

    get passed() {
        return this.state.passed;
    }

    get failed() {
        return this.state.failed;
    }

    render() {
        let passingPercent = (this.state.passed / (this.state.passed + this.state.failed)) * 100;

        if(isNaN(passingPercent)){
            passingPercent = 0;
        }

        let element = document.createElement('div');
        element.classList.add('row');

        element.innerHTML = `
            <div class="cell">
                <h4>${this.state.wordEn}</h4>
            </div>
            <div class="cell">
                <h4>${this.state.wordRu}</h4>
            </div>
            <div class="cell">
                <h4>${this.state.gameTheme}</h4>
            </div>
            <div class="cell">
                <h4>${this.state.training}</h4>
            </div>
            <div class="cell">
                <h4>${this.state.failed}</h4>
            </div>
            <div class="cell">
                <h4>${this.state.passed}</h4>
            </div>
            <div class="cell">
                <h4>${passingPercent.toFixed()} %</h4>
            </div> `;

        return element;
    }
}