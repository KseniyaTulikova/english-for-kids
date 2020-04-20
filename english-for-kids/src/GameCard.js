import { Component } from './Component.js';

export class GameCard extends Component {
    constructor(gameCardInfo) {
        super({
            wordEn: gameCardInfo.wordEn,
            wordRu: gameCardInfo.wordRu,
            imgUrl: gameCardInfo.imgUrl,
            cardAudio: gameCardInfo.audio
        });

        this.isRotated = false;
        this.isPlayMode = false;
    }

    render() {
        let cardContainer = document.createElement('div');
        cardContainer.classList.add('card-container');
        
        let none = this.isPlayMode ? 'none' : '';
        let cardCover = this.isPlayMode ? 'card-cover' : '';

        cardContainer.innerHTML = `
            <div class="card ${cardCover}">
                <div class="card-front"  style="background-image: url(${this.state.imgUrl});">
                    <div class="card-word en ${none}">${this.state.wordEn}</div>
                </div>
                <div class="card-back" style="background-image: url(${this.state.imgUrl});">
                    <div class="card-word ru ${none}">${this.state.wordRu}</div>
                </div>
                <div class="rotate ${none}"></div>
            </div>`;      

        return cardContainer;
    }

    setListeners() {
        this.rootElement.querySelector('.rotate').addEventListener('click',() => {
            this.isRotated = true;
            this.rootElement.querySelector('.card').classList.add('translate');
        });

        this.rootElement.querySelector('.card').addEventListener('mouseleave',() => {
            if(this.isRotated){
                this.isRotated = !this.isRotated;
                this.rootElement.querySelector('.card').classList.remove('translate');
            } 
        });
        
    }

    setDataAttribute(name, value) {
        this.rootElement.querySelector('.card').dataset[name] = value;
    }

    play() {
        if(!this.isRotated){
            let audio = new Audio(this.state.cardAudio);
            audio.play();
        } 
    }

    makeActive() {
        this.rootElement.classList.add('card-out-game');
    }

    makeInActive() {
        this.rootElement.classList.remove('card-out-game');
    }
    
    toggleMode() {
        this.isPlayMode = !this.isPlayMode;
        this.rootElement.querySelectorAll('.card-word, .rotate').forEach(element => {
            element.classList.toggle('none');
        });

        this.rootElement.querySelector('.card').classList.toggle('card-cover');
    }
}