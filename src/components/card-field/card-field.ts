import { BaseComponent } from '../base-component';
import { Card } from '../card/card';
import './card-field.scss';

const SHOW_TIME = 5;

export class CardsField extends BaseComponent {
  private cards: Card[] = [];

  constructor() {
    super('div', ['card-field']);
  }

  clear():void {
    this.cards = [];
    this.element.innerHTML = '';
    if (document.querySelectorAll('.cards').length !== 1) {
      document.querySelector('.cards')?.remove();
    }
  }

  clearFormainPage = ():void => {
    if (document.querySelectorAll('.cards').length !== 0) {
      document.querySelector('.cards')?.remove();
    }
    if (document.querySelectorAll('.main-page-content').length !== 0) {
      document.querySelectorAll('.main-page-content').forEach((a) => {
        a.remove();
      });
    }
  };

  clearWithError = ():void => {
    if (document.querySelectorAll('.cards').length !== 0) {
      document.querySelector('.cards')?.remove();
    }
    if (document.querySelectorAll('.main-page-content').length !== 1) {
      document.querySelector('.main-page-content')?.remove();
    }
  };

  addCards(cards: Card[]) :void {
    this.cards = cards;
    this.cards.forEach((card) => this.element.appendChild(card.element));
  }
}
