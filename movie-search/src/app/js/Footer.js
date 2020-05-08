import Component from "./Component";

export default class Footer extends Component{
    constructor(siteInfo) {
        super({
            rs_season: siteInfo.rs_season,
            gitIcon_src: siteInfo.gitIcon_src,
            rsSchoolSeason: siteInfo.rsSchoolSeason,
            rsSchoolUrl: siteInfo.rsSchoolUrl,
            authorName: siteInfo.authorName,
            authorGitHubUrl: siteInfo.authorGitHubUrl,
        });
    }

    render() {
        const element = document.createElement('footer');
        element.innerHTML = `
            <div class="footer">
                <div class="rs-container">
                    <a href=${this.state.rsShoolUrl}>
                        <h2>${this.state.rsSchoolSeason}</h2>
                    </a>
                </div>
                <div class="author-container">
                    <a href=${this.state.authorGitHubUrl} class="author-info">
                        <img src=${this.state.gitIcon_src} alt="Github icon" class="git-icon"/>
                        <h2>${this.state.authorName}</h2>   
                    </a>
                </div>
            </div>`;
        return element;    
    }
}