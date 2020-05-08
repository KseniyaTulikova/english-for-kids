import Component from "./Component";

export default class Header extends Component{
    constructor(siteInfo) {
        super({headerName: siteInfo.titleName});
    }

    render() {
        const element = document.createElement('header');
        element.innerHTML = `
            <div class="header">
                <h1 class="header-title">${this.state.headerName}</h1>
            </div>`;
        return element;    
    }
}