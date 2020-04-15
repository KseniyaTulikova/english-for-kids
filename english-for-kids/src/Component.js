export class Component {
    constructor(state) {
        this.state = state;

        this.rootElement = this.render();
    }

    get htmlElement() {
        return this.rootElement;
    }

    render() {
        return null;
    }

    setState(newState) {
        this.state = newState;

        let newRender = this.render();
        this.rootElement.replaceWith(newRender);
        this.rootElement = newRender;  
    }
}