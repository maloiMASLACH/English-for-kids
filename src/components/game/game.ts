import { BaseComponent } from '../base-component';
import { Card } from '../card/card';
import { CardsField } from '../card-field/card-field';
import { delay } from '../delay/delay';
import { ImageCategoryModel } from '../card/image-category-models';

const FLIP_DELAY = 100;

export class Game extends BaseComponent {
  private readonly cardsField: CardsField;

  private activeCard?: Card;

  private isAnimation = false;

  constructor() {
    super();
    this.cardsField = new CardsField();
    this.element.appendChild(this.cardsField.element);
    this.element.className='cards'
  }

  initGame(images: ImageCategoryModel[]) {

    this.cardsField.clear();
    document.querySelector('.main-page-content')?.remove()
    const cards = images
    .map((url:ImageCategoryModel) => new Card(url))
    cards.forEach((card:Card) => {
      card.element.addEventListener('click', (e) => this.checkEvent(card,e));
    });
    this.cardsField.addCards(cards);

  }
   checkEvent(card:Card,e:Event){
     console.log((<HTMLTextAreaElement>e.target).className.toString)
   if((<HTMLTextAreaElement>e.target).className==card.element.children[0].children[0].children[0].classList.value){
      this.cardAudio(card)
    }else{
      this.cardHandler(card)
    }
  }


  private async cardAudio(card: Card){
    card.element.children[1]?.remove()
    await card.audio()
    return
  }

  private async cardHandler(card: Card) {
    await delay(FLIP_DELAY);
    await card.flipToBack().then(()=>{
      card.element.addEventListener('mouseleave',()=>{card.flipToFront()})
    })
  }
}
