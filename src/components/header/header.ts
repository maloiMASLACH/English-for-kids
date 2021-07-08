import { Component } from '../templates/component';
import './header.scss';

export const enum PageID{
  Main = 'main',
  Statistic = 'statistic',
}
const Buttons = [
  {
    id: PageID.Main,
    text: 'Main',
  },
  {
    id: PageID.Statistic,
    text: 'Statistic',
  },
];
const packs = ['action1', 'action2', 'animals1', 'animals2', 'cloth', 'emotions', 'sport', 'weather'];
const swithcher = `<p>
<label class="checkbox-green">
  <input type="checkbox">
  <span class="checkbox-green-switch" data-label-on="Play" data-label-off="Train"></span>
</label>
</p>`;

export class Header extends Component {
  burgerMenu() {
    const menuBTN = document.querySelector('header img');

    if (!menuBTN?.classList.contains('active')) {
      menuBTN?.addEventListener('click', () => {
        menuBTN.classList.add('active');
        document.querySelector('.burger')?.classList.add('active');
        this.burgerMenu();
      });
    } else {
      menuBTN?.addEventListener('click', () => {
        menuBTN.classList.remove('active');
        document.querySelector('.burger')?.classList.remove('active');
        this.burgerMenu();
      });
      document.querySelector('.burgerBack')?.addEventListener('click', () => {
        menuBTN.classList.remove('active');
        document.querySelector('.burger')?.classList.remove('active');
        this.burgerMenu();
      });
      document.querySelectorAll('.burger p').forEach((tag) => {
        tag.addEventListener('click', () => {
          menuBTN.classList.remove('active');
          document.querySelector('.burger')?.classList.remove('active');
          this.burgerMenu();
        });
      });
    }
  }

  renderHeader() {
    const burgerBack = document.createElement('div');
    burgerBack.className = 'burgerBack';
    const themes = document.createElement('div');
    themes.className = 'burger';
    let val = 0;
    packs.forEach((theme) => {
      const themeBTN = document.createElement('p');
      themeBTN.innerText = theme;
      themeBTN.id = `${val}`;
      val++;
      themes.append(themeBTN);
    });
    themes.append(burgerBack);
    const padeBTNS = document.createElement('div');
    Buttons.forEach((button) => {
      const buttonHTML = document.createElement('a');
      buttonHTML.href = `#${button.id}`;
      buttonHTML.innerText = button.text;
      padeBTNS.append(buttonHTML);
    });
    const flag = document.createElement('img');
    flag.src = 'united-kingdom.png';
    flag.height = 60;
    this.conteiner.append(themes);
    this.conteiner.append(flag);
    this.conteiner.append(padeBTNS);
    this.conteiner.innerHTML += swithcher;

    return this.conteiner;
  }

  render() {
    this.renderHeader();
    return this.conteiner;
  }
}
