export default class Component {
    constructor(state) {
      this.state = null;
      this.rootElement = null;
  
      this.setState(state);
    }
  
    get htmlElement() {
      return this.rootElement;
    }
  
    static render() {
      return null;
    }
  
    setState(newState) {
      this.state = newState;
  
      const newRender = this.render();
      if (this.rootElement != null) {
        this.rootElement.replaceWith(newRender);
      }
      this.rootElement = newRender;
  
      this.setListeners();
    }
  
    // eslint-disable-next-line class-methods-use-this
    setListeners() {
    }
  }