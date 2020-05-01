import Component from './Component';

export default class GameCard extends Component {
  constructor(gameCardInfo) {
    super({
      wordEn: gameCardInfo.wordEn,
      wordRu: gameCardInfo.wordRu,
      imgUrl: gameCardInfo.imgUrl,
      cardAudio: gameCardInfo.audio,
    });

    this.isRotated = false;
    this.isPlayMode = false;
  }

  render() {
    const CARD_CONTAINER = document.createElement('div');
    CARD_CONTAINER.classList.add('card-container');

    const NONE = this.isPlayMode ? 'none' : '';
    const CARD_COVER = this.isPlayMode ? 'card-cover' : '';

    CARD_CONTAINER.innerHTML = `
            <div class="card ${CARD_COVER}">
                <div class="card-front"  style="background-image: url(${this.state.imgUrl});">
                    <div class="card-word en ${NONE}">${this.state.wordEn}</div>
                </div>
                <div class="card-back" style="background-image: url(${this.state.imgUrl});">
                    <div class="card-word ru ${NONE}">${this.state.wordRu}</div>
                </div>
                <div class="rotate ${NONE}"></div>
            </div>`;

    return CARD_CONTAINER;
  }

  setListeners() {
    this.rootElement.querySelector('.rotate').addEventListener('click', () => {
      this.isRotated = true;
      this.rootElement.querySelector('.card').classList.add('translate');
    });

    this.rootElement.querySelector('.card').addEventListener('mouseleave', () => {
      if (this.isRotated) {
        this.isRotated = false;
        this.rootElement.querySelector('.card').classList.remove('translate');
      }
    });
  }

  setInfoClick(stateOfClick) {
    const CURRENT_INFO = JSON.parse(sessionStorage.getItem(this.state.wordEn));

    switch (stateOfClick) {
      case 'training':
        CURRENT_INFO.training += 1;
        break;
      case 'failed':
        CURRENT_INFO.failed += 1;
        break;
      case 'passed':
        CURRENT_INFO.passed += 1;
        break;
      default:
    }

    sessionStorage.setItem(this.state.wordEn, JSON.stringify(CURRENT_INFO));
  }

  setDataAttribute(name, value) {
    this.rootElement.querySelector('.card').dataset[name] = value;
  }

  play() {
    if (!this.isRotated) {
      const audio = new Audio(this.state.cardAudio);
      audio.play();
    }
  }

  makeInactive() {
    this.rootElement.classList.add('card-out-game');
  }

  makeActive() {
    this.rootElement.classList.remove('card-out-game');
  }

  toggleMode() {
    this.isPlayMode = !this.isPlayMode;
    this.rootElement.querySelectorAll('.card-word, .rotate').forEach((element) => {
      element.classList.toggle('none');
    });

    this.rootElement.querySelector('.card').classList.toggle('card-cover');
  }
}
