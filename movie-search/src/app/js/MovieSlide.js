import Component from "./Component";

export default class MovieSlide extends Component {
    constructor(movie) {
        const poster= movie.Poster == 'N/A'? './no-poster.png': movie.Poster ;
        super({
            movieRating: movie.imdbRating,
            movieID: movie.imdbID,
            title: movie.Title,
            year: movie.Year,
            posterSrc: poster,
    });
    }


    render() {
        const element = document.createElement('div');
        element.classList.add('swiper-slide');

        const slide = `<a href="https://www.imdb.com/title/${this.state.movieID}/?ref_=nv_sr_srsg_0" target="_blank" class="movie">
        <div class="row">
        <div class="col-sm">
          <div class="card">
                <div class="poster">
                  <img src=${this.state.posterSrc} alt="Poster">
                </div>
                <div class="details">
                  <h2>${this.state.title}</h2>
                  <div class="rating">
                    <img src="./star.svg" alt="Star">
                    <img src="./star.svg" alt="Star">
                    <img src="./star.svg" alt="Star">
                    <img src="./star.svg" alt="Star">
                    <img src="./star.svg" alt="Star">
                    <span>${this.state.movieRating}</span>
                  </div>
                  <div class="tags">
                    <span class="year">${this.state.year}</span>
                  </div><br>
                </div>
              </div>
        </div>
      </div>
      </a> `;
      element.insertAdjacentHTML('afterbegin', slide);

      return element;
    }

}