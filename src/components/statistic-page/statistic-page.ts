import { PageID } from '../header/header';
import { Page } from '../templates/page';
import { Render } from '../game/game-render';
import { CardsField } from '../card-field/card-field';

export class Statistic extends Page {
  render() {
    const body = document.querySelector('body');
    if (body) {
      //   body.children[1].remove();
      new CardsField().clearFormainPage();
      console.log(body.children[1]);
    }
    sessionStorage.setItem('maincheck', '1');
    console.log('31s');
    const title = this.createHeader('');
    this.conteiner.append(title);
    return this.conteiner;
  }
}
