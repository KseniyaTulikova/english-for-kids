import { Component } from './Component.js';

export class Game extends Component {
    constructor(gameTheme) {
        super(gameTheme);
    }

    render() {
        let element =  document.createElement('a');
        element.className = 'game-theme';
        element.innerHTML = `<img src = "${this.state.src}" alt = "${this.state.themeValue}">${this.state.themeValue}`;

        return element;
    }

    // reverse() {
    //     this.setState({...this.state, isReversed: true});
    // }

}

// let game = new Game({name : 'Action set C', isReversed: false});
// document.body.append(game.htmlElement);

