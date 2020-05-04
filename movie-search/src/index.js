import Header from './Header';
import Footer from './Footer';
import { WEBSITE_INFO } from './site_info.js';

const HEADER = new Header(WEBSITE_INFO);
const FOOTER = new Footer(WEBSITE_INFO);
document.body.append(HEADER.htmlElement, FOOTER.htmlElement);