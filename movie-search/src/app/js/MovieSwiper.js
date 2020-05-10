
import Component from './Component';
import MovieSlide from './MovieSlide';
import Swiper from "swiper";


export default class MovieSwiper extends Component {
    constructor() {
        super({});
        this.swiper = new Swiper ('.swiper-container', {
            effect: 'coverflow',
              grabCursor: true,
              centeredSlides: true,
              slidesPerView: '4',
              coverflowEffect: {
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows : true,
              },
              pagination: {
                el: '.swiper-pagination',
              },
          });

          this.searchingWord = null;
          this.page = 1;
          this.searchMovie('star wars');
    }

    render() {
        const element = document.createElement('div');
        element.classList.add('swiper-container');
        element.innerHTML = `
                <div class="swiper-wrapper">
                    <!-- Slides -->
                    <div class="swiper-slide">Slide 1</div>
                    <div class="swiper-slide">Slide 2</div>
                    <div class="swiper-slide">Slide 3</div>
                    <div class="swiper-slide">Slide 4</div>
                    <div class="swiper-slide">Slide 5</div>
                    <div class="swiper-slide">Slide 6</div>
                    <div class="swiper-slide">Slide 7</div>
                    <div class="swiper-slide">Slide 8</div>
                    <div class="swiper-slide">Slide 9</div>
                </div>
                <div class="swiper-pagination"></div>
            
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
            
                <div class="swiper-scrollbar"></div>`;

        return element;
        
    }

    async searchMovie(word) {
        this.searchingWord = word;
        let movieResult;
        this.page = 1;
        
            try{
                if(/^[?!,.а-яА-ЯёЁ0-9\s]+$/.test(word)) {
                    const translateUrl = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200505T111102Z.57ffd68a08b326de.93636957c6dbf39cd503519db5197d6381e14c89&text=${word}&lang=ru-en`;
                    const response = await fetch(translateUrl);
                    const data = await response.json();
                    this.searchingWord = data.text.join();
                }

                movieResult = await this.getMovies(this.searchingWord, this.page);
                await this.getRating(movieResult);
                this.rootElement.swiper.removeAllSlides();
                this.updateSlider(movieResult.map(movie => new MovieSlide(movie)));
            }
            catch(err){
                console.log('Fetch problem: ' + err.message);
            }
        
    }

    async getMovies(wordSearch, page) {
        const findMovie_url = `http://www.omdbapi.com/?s=${wordSearch}&page=${page}&apikey=7a2d3b23`;

        const movieResponse = await fetch(findMovie_url);
        const movieData = await movieResponse.json();
        this.totalPageQuantity = Math.ceil(movieData.totalResults /10);

        return movieData.Search;
    }

    async getRating(movies) {
        for(const movie of movies) {
            const movieRatingResponse = await fetch(`http://www.omdbapi.com/?i=${movie.imdbID}&apikey=7a2d3b23`);
            const movieRating =  await movieRatingResponse.json();
            movie.imdbRating = movieRating.imdbRating;
        }
    }

    updateSlider(movies) {    
        movies.forEach(slide => this.rootElement.swiper.appendSlide(slide.htmlElement));
    }

    setListeners() {
        this.rootElement.addEventListener('click', async (event) => {
            if(event.target.classList.contains('swiper-button-next')){
                
                this.rootElement.swiper.slideNext();   
                if(this.rootElement.swiper.activeIndex + 7 >= this.rootElement.swiper.slides.length && this.page < this.totalPageQuantity ) {
                    this.page += 1;
                        const movieResult = await this.getMovies(this.searchingWord, this.page);
                        await this.getRating(movieResult, this.page); 
                    
                        this.updateSlider(movieResult.map(movie => new MovieSlide(movie)));
                    
                }
            }else if(event.target.classList.contains('swiper-button-prev')){
                this.rootElement.swiper.slidePrev();    
            }
        })
    }

}