export class Component {
    constructor(state) {
        this.state = null;
        this.rootElement = null;
        
        this.setState(state);
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
        if(this.rootElement != null) {
            this.rootElement.replaceWith(newRender);
        }
        this.rootElement = newRender;
        
        this.setListeners();
    }

    setListeners() {

    }
}