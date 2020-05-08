
import Component from './Component';



export default class MovieSwiper extends Component {
    constructor() {
        super({});
        
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

    async searchMovie(string) {
        let result;
        if(/^[а-яё0-9]+$/i.test(string)) {
            let url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200505T111102Z.57ffd68a08b326de.93636957c6dbf39cd503519db5197d6381e14c89&text=${string}&lang=ru-en`
            try{
                const response = await fetch(url);
                const data = await response.json();
                result = data.text;
            }
            catch(err){
                console.log('Fetch problem: ' + err.message)
            }
        }
        console.log(result);
        
        console.log(data.text)
        
    }

    setListeners() {
        this.rootElement.addEventListener('click', (event) => {
            if(event.target.classList.contains('swiper-button-next')){
                this.rootElement.swiper.slideNext();    
            }else if(event.target.classList.contains('swiper-button-prev')){
                this.rootElement.swiper.slidePrev();    
            }
        })
    }

}