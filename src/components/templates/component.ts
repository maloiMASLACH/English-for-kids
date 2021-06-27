export abstract class Component {
  protected conteiner: HTMLElement;

  constructor(tagName:string, className:string) {
    this.conteiner = document.createElement(tagName);
    this.conteiner.className = className;
  }

  render() {
    return this.conteiner;
  }
}
