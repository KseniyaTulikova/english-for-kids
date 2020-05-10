import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import { WEBSITE_INFO } from './site_info';
import "../css/style";
import "swiper/css/swiper.min.css"
import "swiper/js/swiper.min.js"
import "../css/movieSlide";


const HEADER = new Header(WEBSITE_INFO);
const MAIN = new Main();
const FOOTER = new Footer(WEBSITE_INFO);
document.body.prepend(HEADER.htmlElement, MAIN.htmlElement, FOOTER.htmlElement);    
