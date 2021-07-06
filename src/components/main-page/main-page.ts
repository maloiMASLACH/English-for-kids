import { PageID } from '../header/header';
import { Page } from '../templates/page';
import { Render } from '../game/game-render';
import { CardsField } from '../card-field/card-field';
import './main-page.scss'

export class MainPage extends Page {

  chooseCat(){
    const appElem = document.querySelector('body')
    const categArr = document.querySelectorAll('.burger p')
    categArr.forEach((categ)=>{
      categ.addEventListener('click',()=>{
        sessionStorage.setItem('current',`${categ.textContent}`)
        sessionStorage.setItem('currentID',`${categ.id}`)
        console.log(categArr)
        if (appElem)
        new Render(appElem).newGame()
      })
    })
  }

  chooseCatBigMenu(){
    const appElem = document.querySelector('body')
    const categArr = document.querySelectorAll('.main-page-content div')
    categArr.forEach((categ)=>{
      categ.addEventListener('click',()=>{
        sessionStorage.setItem('current',`${categ.children[1].textContent}`)
        sessionStorage.setItem('currentID',`${categ.children[1].id}`)
        console.log(categArr)
        if (appElem)
        new Render(appElem).newGame()
      })
    })
  }


async  renderPart(){
    const block=document.createElement('div')
    block.className='main-page-content'
    const categArray = document.querySelectorAll('.burger p')
    const res = await fetch('./test.json');
    const categories = await res.json();
    console.log(categories[1][1].image)
    let k=0
    categArray.forEach((tag)=>{
      block.innerHTML+=`
      <div>
      <img src="./images/${tag.textContent}/${categories[k][0].image.split('/')[1]}">
        <p id=${k}>${tag.textContent}</p>
      </div>
      `
      k++
    })

    document.querySelector('body')?.append(block)
    this.chooseCatBigMenu()
  }



  render() {
    console.log(sessionStorage.maincheck)
    if(sessionStorage.maincheck!=='1'){
      document.querySelector(`a[href='#main']`)?.addEventListener('click',()=>{
        this.renderPart();
        new CardsField().clearFormainPage();
      })
    }

    const title = this.createHeader('');
    this.conteiner.append(title);
    this.renderPart()
    this.chooseCat()
    sessionStorage.setItem('maincheck','0')
    return this.conteiner;
  }
}
