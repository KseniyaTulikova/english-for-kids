import Component from "./Component";

export default class Header extends Component{
    constructor(titleName) {
        super({headerName: titleName});
    }

    render() {
        const ELEMENT = document.createElement('header');
        ELEMENT.innerHTML = `
            <div class="header">
                <h1 class="header-title">${this.state.headerName}</h1>
            </div>`;
        return ELEMENT;    
    }
}