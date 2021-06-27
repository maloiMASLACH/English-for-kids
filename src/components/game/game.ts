import { BaseComponent } from '../base-component';
import { Card } from "../card/card";
import { CardsField } from "../card-field/card-field";
import { delay } from "../delay/delay";

const FLIP_DELAY = 300;

export class Game extends BaseComponent {
  private readonly cardsField: CardsField;

  private activeCard?: Card;

  private isAnimation = false;

  constructor() {
    super();
    this.cardsField = new CardsField();
    this.element.appendChild(this.cardsField.element);
  }

  initGame(images: string[]) {
    this.cardsField.clear();

    const cards = images
      .concat(images)
      .map((url) => new Card(url))
      .sort(() => Math.random() - 0.5);

    cards.forEach((card) => {
      card.element.addEventListener('click', () => this.cardHandler(card));
    });

    this.cardsField.addCards(cards);
  }

  private async cardHandler(card: Card) {
    if (this.isAnimation) return;

    if (!card.isFlipped) return;

    this.isAnimation = true;

    await card.flipToFront();

    if (!this.activeCard) {
      this.activeCard = card;
      this.isAnimation = false;
      return;
    }

    if (this.activeCard.image !== card.image) {
      await delay(FLIP_DELAY);
      await Promise.all([this.activeCard.flipToBack(), card.flipToBack()]);
    }

    this.activeCard = undefined;
    this.isAnimation = false;
  }
}
