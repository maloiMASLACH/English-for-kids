import { Header, PageID } from './components/header/header';
import { Page } from './components/templates/page';
import { MainPage } from './components/main-page/main-page';

export class App {
  static contaiter: HTMLElement = document.body;

  private static defaultPage = 'current';

  private header:Header;

  static renderPage(idPage:string) {
    const currentPage = document.querySelector(`#${App.defaultPage}`);
    if (currentPage) {
      currentPage.remove();
    }
    let page: Page | null = null;

    if (idPage) {
      page = new MainPage(idPage);
    }

    if (page) {
      const pageHTML = page.render();
      pageHTML.id = App.defaultPage;
      App.contaiter.append(pageHTML);
    }
  }

  private enableChange = () => {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1);
      App.renderPage(hash);
    });
  };

  constructor() {
    this.header = new Header('header', 'head-menu');
  }

  start = () => {
    App.contaiter.append(this.header.render());
    App.renderPage('garage');
    this.enableChange();
  };
}
