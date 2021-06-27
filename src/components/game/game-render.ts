import { Game } from './game';
import { ImageCategoryModel } from '../card/image-category-models';

export class Render {
  private readonly game: Game;

  constructor(private readonly rootElement: HTMLElement) {
    this.game = new Game();
    this.rootElement.appendChild(this.game.element);
  }

  async newGame():Promise<void> {
    const res = await fetch('./images.json');
    const categories: ImageCategoryModel[] = await res.json();

    const cat = categories[Math.floor(Math.random() * (10 - 0))];
    const images = cat.images.map((name) => `${cat.category}/${name}`);
    this.game.initGame(images);
  }

  async newGameWithSet(cardType:string, difficulty:string):Promise<void> {
    const res = await fetch('./images.json');
    const categories: ImageCategoryModel[] = await res.json();
    const cat = categories[+cardType * 3 + (+difficulty)];
    const images = cat.images.map((name) => `${cat.category}/${name}`);
    this.game.initGame(images);
  }
}
