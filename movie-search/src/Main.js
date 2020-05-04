import Component from "./Component";

export default class Main extends Component{
    constructor(moviesData) {
        // const movies = moviesData.forEach(movie => new Movie(movie));
        super({movies: moviesData});
    }

    render() {
        const element = document.createElement('main');
        element.innerHTML = `
                <form>
                    <input type="search" placeholder="Write down a movie ...">
                    <button type="submit">
                        <h3>Search</h3>
                    </button>
                </form>`;
        return element;    
    }
}