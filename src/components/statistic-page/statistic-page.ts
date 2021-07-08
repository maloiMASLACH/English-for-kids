import { PageID } from '../header/header';
import { Page } from '../templates/page';
import { Render } from '../game/game-render';
import { CardsField } from '../card-field/card-field';
import { ImageCategoryModel } from '../card/image-category-models';
import { MainPage } from '../main-page/main-page';
import './statistic-page.scss';

const packs = ['action1', 'action2', 'animals1', 'animals2', 'cloth', 'emotions', 'sport', 'weather'];

export class Statistic extends Page {
  words = (categ:ImageCategoryModel[], table:HTMLUListElement) => {
    const words = document.createElement('li');
    words.className = 'text';
    categ.forEach((word) => {
      const wordCon = document.createElement('p');
      wordCon.textContent = word.word;
      words.append(wordCon);
    });
    table.append(words);
  };

  transqript = (categ:ImageCategoryModel[], table:HTMLUListElement) => {
    const trans = document.createElement('li');
    trans.className = 'text';
    categ.forEach((trsn) => {
      const wordCon = document.createElement('p');
      wordCon.textContent = trsn.translation;
      trans.append(wordCon);
    });
    table.append(trans);
  };

  clicks = (categ:ImageCategoryModel[], table:HTMLUListElement) => {
    const clicsk = document.createElement('li');
    categ.forEach((clk) => {
      const clkCon = document.createElement('p');
      clkCon.textContent = localStorage.getItem(`${clk.word}`);
      if (!clkCon.textContent) clkCon.textContent = '0';
      clicsk.append(clkCon);
    });
    table.append(clicsk);
  };

  wins = (categ:ImageCategoryModel[], table:HTMLUListElement) => {
    const wins = document.createElement('li');
    categ.forEach((clk) => {
      const clkCon = document.createElement('p');
      clkCon.textContent = localStorage.getItem(`${clk.word}Win`);
      if (!clkCon.textContent) clkCon.textContent = '0';
      wins.append(clkCon);
    });
    table.append(wins);
  };

  looses = (categ:ImageCategoryModel[], table:HTMLUListElement) => {
    const loose = document.createElement('li');
    categ.forEach((clk) => {
      const clkCon = document.createElement('p');
      clkCon.textContent = localStorage.getItem(`${clk.word}Loose`);
      if (!clkCon.textContent) clkCon.textContent = '0';
      loose.append(clkCon);
    });
    table.append(loose);
  };

  procent = (categ:ImageCategoryModel[], table:HTMLUListElement) => {
    const procent = document.createElement('li');
    categ.forEach((clk) => {
      const clkCon = document.createElement('p');
      const wins = localStorage.getItem(`${clk.word}Win`);
      const loose = localStorage.getItem(`${clk.word}Loose`);
      if ((wins) && (loose)) {
        console.log(Number(loose) + Number(wins));
        clkCon.textContent = `${Math.round((100 * Number(wins)) / (Number(loose) + Number(wins)))}%`;
        if (+wins === 0) clkCon.textContent = '0%';
        if (+loose === 0) clkCon.textContent = '100%';
      }
      if ((!wins) || (!loose)) clkCon.textContent = '0%';
      procent.append(clkCon);
    });
    table.append(procent);
  };

  titlePart = (block:HTMLDivElement) => {
    const title = document.createElement('ul');
    const tags = document.createElement('li');
    tags.textContent = 'Theme';
    tags.className = 'text';
    title.append(tags);
    const allWords = document.createElement('li');
    allWords.textContent = 'Words';
    allWords.className = 'text';
    title.append(allWords);
    const alltrans = document.createElement('li');
    alltrans.textContent = 'Transcription';
    alltrans.className = 'text';
    title.append(alltrans);
    const allClicks = document.createElement('li');
    allClicks.textContent = 'Clicks';
    title.append(allClicks);
    const allWins = document.createElement('li');
    allWins.textContent = 'Correct';
    title.append(allWins);
    const allLoose = document.createElement('li');
    allLoose.textContent = 'Misstakes';
    title.append(allLoose);
    const allProc = document.createElement('li');
    allProc.textContent = 'W/L';
    title.append(allProc);
    block.append(title);
  };

  tableConstract(categories:ImageCategoryModel[][]) {
    const block = document.createElement('div');
    block.className = 'table';
    let i = 0;
    this.titlePart(block);
    categories.forEach((categ:ImageCategoryModel[]) => {
      const table = document.createElement('ul');
      const tag = document.createElement('li');
      tag.className = 'text';
      tag.textContent = packs[i];
      table.append(tag);
      this.words(categ, table);
      this.transqript(categ, table);
      this.clicks(categ, table);
      this.wins(categ, table);
      this.looses(categ, table);
      this.procent(categ, table);
      block.append(table);
      i++;
    });
    this.conteiner.append(block);
  }

  async table() {
    document.querySelector('.cards')?.remove();
    document.querySelector('.table')?.remove();
    const res = await fetch('./test.json');
    const categories = await res.json();
    this.tableConstract(categories);
  }

  startGame = () => {
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
          console.log('312');
          document.getElementById('current')?.children[1].remove();
          new Render(appElem).newGame();
        }
      });
    });
  };

  render() {
    const body = document.querySelector('body');
    if (body) {
      new CardsField().clearFormainPage();
      console.log(body.children[1]);
    }
    document.querySelector('a[href=\'#statistic\']')?.addEventListener('click', () => {
      this.table();
    });
    sessionStorage.setItem('maincheck', '1');
    console.log('31s');
    const title = this.createHeader('');
    this.conteiner.append(title);
    this.table();
    this.startGame();

    document.querySelector('footer')?.remove();
    return this.conteiner;
  }
}
