import { PageID } from '../header/header';
import { Page } from '../templates/page';
import { Render } from '../game/game-render';
import { CardsField } from '../card-field/card-field';
import { delay } from '../delay/delay';
import './main-page.scss';

export class MainPage extends Page {
  async gameRes() {
    const result = document.createElement('div');
    result.className = 'result';
    const misstakes = document.querySelectorAll('.starLoose').length;
    if (misstakes !== 0) {
      const sound = document.createElement('div');
      sound.innerHTML = '<audio src="failure.mp3" autoplay="autoplay"></audio>';
      result.append(sound);
      const img = document.createElement('img');
      img.src = 'failure.jpg';
      const text = document.createElement('p');
      if (misstakes === 1) {
        text.textContent = `${misstakes} misstake`;
      } else {
        text.textContent = `${misstakes} misstakes`;
      }
      result.append(img);
      result.append(text);
    } else {
      const sound = document.createElement('div');
      sound.innerHTML = '<audio src="sucsess.mp3" autoplay="autoplay"></audio>';
      result.append(sound);
      const img = document.createElement('img');
      img.src = 'success.jpg';
      const text = document.createElement('p');
      text.textContent = 'Complete';
      result.append(img);
      result.append(text);
    }
    this.conteiner.append(result);
    await delay(2000);
    await this.renderAgain();
  }

  renderStar(winCheck:number) {
    if (winCheck === 1) {
      const star = document.createElement('img');
      star.className = 'star starWin';
      star.src = 'starWin.png';
      document.querySelector('.starCon')?.append(star);
      if (document.querySelectorAll('.starWin').length === 8) {
        this.gameRes();
      }
    }
    if (winCheck === 0) {
      const star = document.createElement('img');
      star.className = 'star starLoose';
      star.src = 'starLoose.png';
      document.querySelector('.starCon')?.append(star);
    }
  }

  createSound(textCon:string, shuffledArr:string[], card:Element) {
    if (textCon === shuffledArr[0]) {
      const sound = document.createElement('div');
      sound.innerHTML = `<audio src="./audio/${sessionStorage.current}/${shuffledArr[1]}.mp3" autoplay="autoplay"></audio>`;
      this.conteiner.append(sound);
      card.classList.add('passed');
      const val = localStorage.getItem(`${textCon}Win`);
      if (val) localStorage.setItem(`${textCon}Win`, `${+val + 1}`);
      console.log(localStorage.getItem(`${textCon}Win`));
      shuffledArr.splice(0, 1);
      this.renderStar(1);
    } else {
      const val = localStorage.getItem(`${textCon}Loose`);
      if (val) localStorage.setItem(`${textCon}Loose`, `${+val + 1}`);
      console.log(localStorage.getItem(`${textCon}Loose`));
      const soundFalse = document.createElement('div');
      soundFalse.innerHTML = `<audio src="./audio/${sessionStorage.current}/${shuffledArr[0]}.mp3" autoplay="autoplay"></audio>`;
      this.conteiner.append(soundFalse);
      this.renderStar(0);
    }
  }

  giveSoundMain(soundCon:string[], cards:NodeListOf<Element>) {
    const stars = (document.createElement('div'));
    stars.className = 'starCon';
    this.conteiner.append(stars);
    const shuffledArr = soundCon.sort(() => Math.random() - 0.5);
    const sound = document.createElement('div');
    sound.innerHTML = `<audio src="./audio/${sessionStorage.current}/${shuffledArr[0]}.mp3" autoplay="autoplay"></audio>`;
    this.conteiner.append(sound);
    cards.forEach((card) => {
      card.addEventListener('click', () => {
        const textCon = (<HTMLAreaElement>card.children[0].children[1].children[1]).textContent;
        if (textCon) this.createSound(textCon, shuffledArr, card);
      });
    });
    document.querySelector('.repeatBTN')?.addEventListener('click', () => {
      const soundR = document.createElement('div');
      soundR.innerHTML = `<audio src="./audio/${sessionStorage.current}/${shuffledArr[0]}.mp3" autoplay="autoplay"></audio>`;
      this.conteiner.append(soundR);
    });
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
    this.giveSoundMain(soundCon, cards);
  }

  async startBTN() {
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
        categArr.forEach((cat) => {
          cat.classList.remove('currentTitle');
        });
        categ.classList.add('currentTitle');
        sessionStorage.setItem('current', `${categ.textContent}`);
        sessionStorage.setItem('currentID', `${categ.id}`);

        if (appElem) {
          new Render(appElem).newGame();
          this.startBtnCheck();
        }
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
        const categBur = document.querySelectorAll('.burger p');
        categBur.forEach((burg) => {
          burg.classList.remove('currentTitle');
          if (burg.textContent === categ.children[1].textContent) {
            burg.classList.add('currentTitle');
          }
        });
        if (appElem) {
          new Render(appElem).newGame();
          this.startBtnCheck();
        }
      });
    });
  }

  footer = () => {
    const block = document.createElement('footer');
    block.innerHTML = `
    <p>2021</p>
    <a href="https://github.com/maloiMASLACH"><p >My Git</p></a>
    <a href="https://rs.school/js/"><img src="logo.png" ></a>
    `;
    document.querySelector('body')?.append(block);
  };

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
    document.querySelector('footer')?.remove();
    document.querySelector('.result')?.remove();
    document.querySelector('.starCon')?.remove();
    document.querySelector('.startBTN')?.remove();
    document.querySelector('.repeatBTN')?.remove();
    await this.renderPart();
    await new CardsField().clearWithError();
  }

  async startBtnCheck() {
    const check = document.querySelector('input');
    if ((check?.checked) && (!document.querySelector('.startBTN')) && (document.querySelector('.cards'))) {
      console.log('312');
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
    document.querySelector('a[href=\'#main\']')?.addEventListener('click', () => {
      this.renderAgain();
    });
    this.renderAgain();
    const title = this.createHeader('');
    this.conteiner.append(title);
    this.chooseCat();
    this.gameMode();
    this.footer();
    return this.conteiner;
  }
}
