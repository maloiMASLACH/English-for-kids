import { Component } from '../templates/component';
import './header.scss';

export const enum PageID{
  Main = 'main',
  Statistic = 'statistic',
}
const Buttons = [
  {
    id: PageID.Main,
    text: 'Main ',
  },
  {
    id: PageID.Statistic,
    text: 'Statistic',
  },
];

export class Header extends Component {
  renderHeader() {
    const padeBTNS = document.createElement('div');
    Buttons.forEach((button) => {
      const buttonHTML = document.createElement('a');
      buttonHTML.href = `#${button.id}`;
      buttonHTML.innerText = button.text;
      padeBTNS.append(buttonHTML);
    });
    const phone = document.createElement('img');
    phone.src = 'united-kingdom.png';
    phone.height = 60;
    this.conteiner.append(phone);
    this.conteiner.append(padeBTNS);
    return this.conteiner;
  }

  render() {
    this.renderHeader();
    return this.conteiner;
  }
}
