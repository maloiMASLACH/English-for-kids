import { PageID } from '../header/header';
import { Page } from '../templates/page';
import { Render } from '../game/game-render';

export class Statistic extends Page {
  render() {
    const body = document.querySelector('body')
    if (body){
      body.children[1].remove()
      console.log()
    }
    sessionStorage.setItem('maincheck','1')
    const title = this.createHeader('');
    console.log('qq')
    return this.conteiner;
  }
}
