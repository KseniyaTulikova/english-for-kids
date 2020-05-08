import Component from "./Component";
import MovieSwiper from "./MovieSwiper";

export default class Main extends Component{
    constructor() {
        const movieSwiper = new MovieSwiper();
        super({swiper: movieSwiper});
    }

    render() {
        const element = document.createElement('main');
        element.innerHTML = `
                <form class="search-form">
                    <input name="search-input" type="search" placeholder="Write down a movie ...">
                    <button type="submit">
                        <h3>Search</h3>
                    </button>
                </form>`;

        element.append(new MovieSwiper().htmlElement);
        return element;    
    }

    setListeners() {
        this.rootElement.addEventListener('click', (e) => {
            if(event.target.closest('button').type == 'submit') {
                event.preventDefault();
                let movie = this.rootElement.querySelector('form > input[type="search"]').value;
                this.state.swiper.searchMovie(movie);
            }
           
        });
    }
}