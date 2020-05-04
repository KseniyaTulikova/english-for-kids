import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import { WEBSITE_INFO } from './site_info.js';

const HEADER = new Header(WEBSITE_INFO);
const MAIN = new Main('hey'); 
const FOOTER = new Footer(WEBSITE_INFO);
document.body.append(HEADER.htmlElement, MAIN.htmlElement, FOOTER.htmlElement);