import { BaseComponent } from '../base-component';
import { ImageCategoryModel } from './image-category-models';
import './card.css'

const FLIP_CLASS = 'flipped';

export class Card extends BaseComponent {
  isFlipped = false;

  constructor(readonly card: ImageCategoryModel) {
    super('div', ['card-container']);
    console.log(card)
    this.element.innerHTML = `
     <div class="card">
       <div class="card-front">
        <div class="card-image"style="background-image: url('./images/${sessionStorage.current}/${card.image.split('/')[1]}')"></div>
          <div class="card-info">
            <p></p>
            <p>${card.word}</p>
            <img src="flip.png">
        </div>
      </div>
        <div class="card-back">
          <div class="card-image"style="background-image: url('./images/${sessionStorage.current}/${card.image.split('/')[1]}')"></div>
            <p>${card.translation}<p>
        </div>
     </div>
     `;
  }
  async audio(){
    const sound =`<audio src="./audio/${sessionStorage.current}/${this.card.audioSrc.split('/')[1]}" autoplay="none"></audio>`;
    this.element.innerHTML += sound
  }

  flipToBack():Promise<void> {
    this.isFlipped = true;
    return this.flip(true);
  }

  flipToFront():Promise<void> {
    this.isFlipped = false;
    return this.flip();
  }

  private flip(isFront = false):Promise<void> {
    return new Promise((resolve) => {
      this.element.classList.toggle(FLIP_CLASS, isFront);
      this.element.addEventListener('transitionend', () => resolve(), {
        once: true,
      });
    });
  }
}
