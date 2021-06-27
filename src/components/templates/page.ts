export abstract class Page {
  protected conteiner: HTMLElement;

  static TextObg = {};

  constructor(id:string) {
    this.conteiner = document.createElement('div');
    this.conteiner.id = id;
  }

  protected createHeader = (text:string) => {
    const headerTitile = document.createElement('h1');
    headerTitile.innerText = text;
    return headerTitile;
  };

  render() {
    return this.conteiner;
  }
}
