import { PageID } from '../header/header';
import { Page } from '../templates/page';
import { Render } from '../game/game-render';
import { CardsField } from '../card-field/card-field';
import { delay } from '../delay/delay';
import './main-page.scss';

export class MainPage extends Page {
  giveSound(soundCon:string[], cards:NodeListOf<Element>) {
    if (!sessionStorage.currentWord) {
      const soundNumber = Math.floor(Math.random() * soundCon.length);
      sessionStorage.setItem('currentWord', `${soundNumber}`);
      const sound = document.createElement('div');
      sound.innerHTML = `<audio src="./audio/${sessionStorage.current}/${soundCon[sessionStorage.currentWord]}.mp3" autoplay="autoplay"></audio>`;
      this.conteiner.append(sound);
      cards.forEach((card) => {
        const textCon = (<HTMLAreaElement>card.children[0].children[1].children[1]).textContent;
        card.addEventListener('click', () => {
          console.log(textCon, soundCon[sessionStorage.currentWord]);
          if (textCon === soundCon[sessionStorage.currentWord]) {
            soundCon.splice(+sessionStorage.currentWord, 1);
            sessionStorage.removeItem('currentWord');
            this.giveSound(soundCon, cards);
          }
        });
      });
    }
    if (soundCon.length === 0) {
      alert('end');
    }
  }

  repeatSound(soundCon:string[]) {
    const sound = document.createElement('div');
    sound.innerHTML = `<audio src="./audio/${sessionStorage.current}/${soundCon[sessionStorage.currentWord]}.mp3" autoplay="autoplay"></audio>`;
    this.conteiner.append(sound);
  }

  gamePlay() {
    const button = document.querySelector('.startBTN');
    button?.remove();
    const repeatBtn = document.createElement('div');
    repeatBtn.className = 'repeatBTN';
    const buttonText = document.createElement('p');
    buttonText.textContent = 'REPEAT';
    repeatBtn?.append(buttonText);
    this.conteiner.append(repeatBtn);
    const soundCon:string[] = [];
    const cards = document.querySelectorAll('.card');
    cards.forEach((card) => {
      const word = (<HTMLAreaElement>card.children[0].children[1].children[1]).textContent;
      if (word) soundCon[soundCon.length] = word;
    });
    this.giveSound(soundCon, cards);
    document.querySelector('.repeatBTN')?.addEventListener('click', () => {
      this.repeatSound(soundCon);
    });
  }

  startBTN() {
    const btn = document.createElement('div');
    btn.className = 'startBTN';
    const btnText = document.createElement('p');
    btnText.innerText = 'START';
    btn.append(btnText);
    this.conteiner.append(btn);
    const cards = document.querySelectorAll('.card');
    cards.forEach((card) => {
      card.classList.add('active');
    });
    document.querySelector('.startBTN')?.addEventListener('click', () => {
      sessionStorage.setItem('game', '1');
      this.gamePlay();
    });
  }

  chooseCat = () => {
    const appElem = document.querySelector('body');
    const categArr = document.querySelectorAll('.burger p');
    categArr.forEach((categ) => {
      categ.addEventListener('click', () => {
        sessionStorage.setItem('current', `${categ.textContent}`);
        sessionStorage.setItem('currentID', `${categ.id}`);
        if (appElem) new Render(appElem).newGame();
      });
    });
  };

  chooseCatBigMenu() {
    document.querySelector('.repeatBTN')?.remove();
    const appElem = document.querySelector('body');
    const categArr = document.querySelectorAll('.main-page-content div');
    categArr.forEach((categ) => {
      categ.addEventListener('click', () => {
        sessionStorage.setItem('current', `${categ.children[1].textContent}`);
        sessionStorage.setItem('currentID', `${categ.children[1].id}`);
        if (appElem) new Render(appElem).newGame();
        this.startBtnCheck();
      });
    });
  }

  async renderPart() {
    const block = document.createElement('div');
    block.className = 'main-page-content';
    const categArray = document.querySelectorAll('.burger p');
    const res = await fetch('./test.json');
    const categories = await res.json();
    console.log(categories[1][1].image);
    let k = 0;
    categArray.forEach((tag) => {
      block.innerHTML += `
      <div>
      <img src="./images/${tag.textContent}/${categories[k][0].image.split('/')[1]}">
        <p id=${k}>${tag.textContent}</p>
      </div>
      `;
      k++;
    });
    sessionStorage.removeItem('currentWord');
    document.querySelector('body')?.append(block);
    this.chooseCatBigMenu();
  }

  async renderAgain() {
    document.querySelector('.startBTN')?.remove();
    document.querySelector('.repeatBTN')?.remove();
    await this.renderPart();
    await new CardsField().clearWithError();
  }

  async startBtnCheck() {
    const check = document.querySelector('input');
    if ((check?.checked) && (!document.querySelector('.startBTN')) && (document.querySelector('.cards'))) {
      await this.startBTN();
    }
  }

  async gameMode() {
    const check = document.querySelector('input');
    await check?.addEventListener('click', () => {
      if ((check.checked) && (!document.querySelector('.startBTN')) && (document.querySelector('.cards'))) {
        console.log(check?.checked);
        this.startBTN();
      }
      if ((!check.checked) && ((document.querySelector('.startBTN')) || (document.querySelector('.repeatBTN')))) {
        document.querySelector('.startBTN')?.remove();
        document.querySelector('.repeatBTN')?.remove();
        sessionStorage.setItem('game', '0');
        sessionStorage.removeItem('currentWord');
        document.querySelectorAll('.card').forEach((card) => {
          card.classList.remove('active');
        });
      }
    });
  }

  render() {
    sessionStorage.setItem('game', '0');
    if (sessionStorage.maincheck === '0') {
      document.querySelector('a[href=\'#main\']')?.addEventListener('click', () => {
        this.renderAgain();
      });
    } else {
      sessionStorage.setItem('maincheck', '0');
      this.renderAgain();
    }
    if (!sessionStorage.firstload) {
      this.renderPart();
      sessionStorage.setItem('firstload', '1');
    }
    const title = this.createHeader('');
    this.conteiner.append(title);
    this.chooseCat();
    this.gameMode();
    return this.conteiner;
  }
}
