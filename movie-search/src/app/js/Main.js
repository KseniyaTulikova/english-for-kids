import Component from "./Component";
import MovieSwiper from "./MovieSwiper";

export default class Main extends Component{
    constructor() {
        const movieSwiper = new MovieSwiper();
        super({movieSwiper: movieSwiper});
    }

    render() {
        const element = document.createElement('main');
        element.innerHTML = `
                    <form class="search-form">
                        <input name="search-input" type="search" placeholder="Write down a movie ..." autocomplete="off">
                        <div class="loader-container none">
                            <div class="loader-1"></div>
                        </div>
                        <button type="submit">
                            <h3>Search</h3>
                        </button>
                    </form>`;

        element.append(this.state.movieSwiper.htmlElement);



        return element;       
    }

    setListeners() {
        this.rootElement.addEventListener('click', async (e) => {
            if(event.target.closest('button')) {
                event.preventDefault();
                let movie = this.rootElement.querySelector('form > input[type="search"]').value;
                this.rootElement.querySelector('.loader-container').classList.remove('none');
                await this.state.movieSwiper.searchMovie(movie);
                this.rootElement.querySelector('.loader-container').classList.add('none');
            }
           
        });
    }
}