import { PageID } from '../header/header';
import { Page } from '../templates/page';
import { Render } from '../game/game-render';

export class MainPage extends Page {
  render() {
    const appEl = document.getElementById('current')
    const title = this.createHeader('');

    this.conteiner.append(title);
    return this.conteiner;
  }
}
