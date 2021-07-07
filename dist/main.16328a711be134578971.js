(()=>{"use strict";var e={442:(e,t,n)=>{n.r(t)},528:(e,t,n)=>{n.r(t)},70:(e,t,n)=>{n.r(t)},953:(e,t,n)=>{n.r(t)},752:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.App=void 0;const r=n(977),o=n(642),c=n(397);class i{constructor(){this.enableChange=()=>{window.addEventListener("hashchange",(()=>{const e=window.location.hash.slice(1);i.renderPage(e)}))},this.start=()=>{sessionStorage.removeItem("firstload"),i.contaiter.append(this.header.render()),i.renderPage("main"),this.header.burgerMenu(),this.enableChange()},this.header=new r.Header("header","head-menu")}static renderPage(e){const t=document.querySelector(`#${i.defaultPage}`);t&&t.remove();let n=null;if("statistic"===e?(n=new c.Statistic(e),console.log("eyp")):n=new o.MainPage(e),n){const e=n.render();e.id=i.defaultPage,i.contaiter.append(e)}}}t.App=i,i.contaiter=document.body,i.defaultPage="current"},583:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.BaseComponent=void 0,t.BaseComponent=class{constructor(e="div",t=[]){this.element=document.createElement(e),this.element.classList.add(...t)}}},351:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.CardsField=void 0;const r=n(583);n(442);class o extends r.BaseComponent{constructor(){super("div",["card-field"]),this.cards=[],this.clearFormainPage=()=>{var e;0!==document.querySelectorAll(".cards").length&&(null===(e=document.querySelector(".cards"))||void 0===e||e.remove()),0!==document.querySelectorAll(".main-page-content").length&&(console.log("e"),document.querySelectorAll(".main-page-content").forEach((e=>{e.remove()})))},this.clearWithError=()=>{var e,t;0!==document.querySelectorAll(".cards").length&&(null===(e=document.querySelector(".cards"))||void 0===e||e.remove()),1!==document.querySelectorAll(".main-page-content").length&&(console.log("e"),null===(t=document.querySelector(".main-page-content"))||void 0===t||t.remove())}}clear(){var e;console.log(this.element),this.cards=[],this.element.innerHTML="",1!==document.querySelectorAll(".cards").length&&(null===(e=document.querySelector(".cards"))||void 0===e||e.remove())}addCards(e){console.log(e),this.cards=e,this.cards.forEach((e=>console.log(e.element))),this.cards.forEach((e=>this.element.appendChild(e.element)))}}t.CardsField=o},343:function(e,t,n){var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,c){function i(e){try{a(r.next(e))}catch(e){c(e)}}function s(e){try{a(r.throw(e))}catch(e){c(e)}}function a(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,s)}a((r=r.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.Card=void 0;const o=n(583);n(953);class c extends o.BaseComponent{constructor(e){super("div",["card-container"]),this.card=e,this.isFlipped=!1,console.log(e),this.element.innerHTML=`\n     <div class="card">\n       <div class="card-front">\n        <div class="card-image"style="background-image: url('./images/${sessionStorage.current}/${e.image.split("/")[1]}')"></div>\n          <div class="card-info">\n            <p></p>\n            <p>${e.word}</p>\n            <img src="flip.png">\n        </div>\n      </div>\n        <div class="card-back">\n          <div class="card-image"style="background-image: url('./images/${sessionStorage.current}/${e.image.split("/")[1]}')"></div>\n            <p>${e.translation}<p>\n        </div>\n     </div>\n     `}audio(){return r(this,void 0,void 0,(function*(){const e=`<audio src="./audio/${sessionStorage.current}/${this.card.audioSrc.split("/")[1]}" autoplay="none"></audio>`;this.element.innerHTML+=e}))}flipToBack(){return this.isFlipped=!0,this.flip(!0)}flipToFront(){return this.isFlipped=!1,this.flip()}flip(e=!1){return new Promise((t=>{this.element.classList.toggle("flipped",e),this.element.addEventListener("transitionend",(()=>t()),{once:!0})}))}}t.Card=c},463:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.delay=void 0,t.delay=function(e){return new Promise((t=>{setTimeout(t,e)}))}},889:function(e,t,n){var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,c){function i(e){try{a(r.next(e))}catch(e){c(e)}}function s(e){try{a(r.throw(e))}catch(e){c(e)}}function a(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,s)}a((r=r.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.Render=void 0;const o=n(229);t.Render=class{constructor(e){this.rootElement=e,this.game=new o.Game,this.rootElement.appendChild(this.game.element)}newGame(){return r(this,void 0,void 0,(function*(){const e=yield fetch("./test.json"),t=yield e.json();console.log(t);const n=t[sessionStorage.currentID];this.game.initGame(n)}))}}},229:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Game=void 0;const r=n(583),o=n(343),c=n(351),i=n(463);class s extends r.BaseComponent{constructor(){super(),this.isAnimation=!1,this.cardAudio=e=>{var t;null===(t=e.element.children[1])||void 0===t||t.remove(),e.audio()},this.cardHandler=e=>{i.delay(100),e.flipToBack().then((()=>{e.element.addEventListener("mouseleave",(()=>{e.flipToFront()}))}))},this.cardsField=new c.CardsField,this.element.appendChild(this.cardsField.element),this.element.className="cards"}initGame(e){var t;this.cardsField.clear(),null===(t=document.querySelector(".main-page-content"))||void 0===t||t.remove();const n=e.map((e=>new o.Card(e)));n.forEach((e=>{e.element.addEventListener("click",(t=>this.checkEvent(e,t)))})),this.cardsField.addCards(n)}checkEvent(e,t){"1"!==sessionStorage.game&&(console.log(t.target.className.toString),t.target.className===e.element.children[0].children[0].children[0].classList.value?this.cardAudio(e):this.cardHandler(e))}}t.Game=s},977:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Header=void 0;const r=n(164);n(528);const o=[{id:"main",text:"Main"},{id:"statistic",text:"Statistic"}],c=["action1","action2","animals1","animals2","cloth","emotions","sport","weather"];class i extends r.Component{burgerMenu(){var e;const t=document.querySelector("header img");(null==t?void 0:t.classList.contains("active"))?(null==t||t.addEventListener("click",(()=>{var e;t.classList.remove("active"),null===(e=document.querySelector(".burger"))||void 0===e||e.classList.remove("active"),this.burgerMenu()})),null===(e=document.querySelector(".burgerBack"))||void 0===e||e.addEventListener("click",(()=>{var e;t.classList.remove("active"),null===(e=document.querySelector(".burger"))||void 0===e||e.classList.remove("active"),this.burgerMenu()})),document.querySelectorAll(".burger p").forEach((e=>{e.addEventListener("click",(()=>{var e;t.classList.remove("active"),null===(e=document.querySelector(".burger"))||void 0===e||e.classList.remove("active"),this.burgerMenu()}))}))):null==t||t.addEventListener("click",(()=>{var e;t.classList.add("active"),null===(e=document.querySelector(".burger"))||void 0===e||e.classList.add("active"),this.burgerMenu()}))}renderHeader(){const e=document.createElement("div");e.className="burgerBack";const t=document.createElement("div");t.className="burger";let n=0;c.forEach((e=>{const r=document.createElement("p");r.innerText=e,r.id=`${n}`,n++,t.append(r)})),t.append(e);const r=document.createElement("div");o.forEach((e=>{const t=document.createElement("a");t.href=`#${e.id}`,t.innerText=e.text,r.append(t)}));const i=document.createElement("img");return i.src="united-kingdom.png",i.height=60,this.conteiner.append(t),this.conteiner.append(i),this.conteiner.append(r),this.conteiner.innerHTML+='<p>\n<label class="checkbox-green">\n  <input type="checkbox">\n  <span class="checkbox-green-switch" data-label-on="Play" data-label-off="Train"></span>\n</label>\n</p>',this.conteiner}render(){return this.renderHeader(),this.conteiner}}t.Header=i},642:function(e,t,n){var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,c){function i(e){try{a(r.next(e))}catch(e){c(e)}}function s(e){try{a(r.throw(e))}catch(e){c(e)}}function a(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,s)}a((r=r.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.MainPage=void 0;const o=n(163),c=n(889),i=n(351);n(70);class s extends o.Page{constructor(){super(...arguments),this.chooseCat=()=>{const e=document.querySelector("body");document.querySelectorAll(".burger p").forEach((t=>{t.addEventListener("click",(()=>{sessionStorage.setItem("current",`${t.textContent}`),sessionStorage.setItem("currentID",`${t.id}`),e&&new c.Render(e).newGame()}))}))}}giveSound(e,t){if(!sessionStorage.currentWord){const n=Math.floor(Math.random()*e.length);sessionStorage.setItem("currentWord",`${n}`);const r=document.createElement("div");r.innerHTML=`<audio src="./audio/${sessionStorage.current}/${e[sessionStorage.currentWord]}.mp3" autoplay="autoplay"></audio>`,this.conteiner.append(r),t.forEach((n=>{const r=n.children[0].children[1].children[1].textContent;n.addEventListener("click",(()=>{console.log(r,e[sessionStorage.currentWord]),r===e[sessionStorage.currentWord]&&(e.splice(+sessionStorage.currentWord,1),sessionStorage.removeItem("currentWord"),this.giveSound(e,t))}))}))}0===e.length&&alert("end")}repeatSound(e){const t=document.createElement("div");t.innerHTML=`<audio src="./audio/${sessionStorage.current}/${e[sessionStorage.currentWord]}.mp3" autoplay="autoplay"></audio>`,this.conteiner.append(t)}gamePlay(){var e;const t=document.querySelector(".startBTN");null==t||t.remove();const n=document.createElement("div");n.className="repeatBTN";const r=document.createElement("p");r.textContent="REPEAT",null==n||n.append(r),this.conteiner.append(n);const o=[],c=document.querySelectorAll(".card");c.forEach((e=>{const t=e.children[0].children[1].children[1].textContent;t&&(o[o.length]=t)})),this.giveSound(o,c),null===(e=document.querySelector(".repeatBTN"))||void 0===e||e.addEventListener("click",(()=>{this.repeatSound(o)}))}startBTN(){var e;const t=document.createElement("div");t.className="startBTN";const n=document.createElement("p");n.innerText="START",t.append(n),this.conteiner.append(t),document.querySelectorAll(".card").forEach((e=>{e.classList.add("active")})),null===(e=document.querySelector(".startBTN"))||void 0===e||e.addEventListener("click",(()=>{sessionStorage.setItem("game","1"),this.gamePlay()}))}chooseCatBigMenu(){var e;null===(e=document.querySelector(".repeatBTN"))||void 0===e||e.remove();const t=document.querySelector("body");document.querySelectorAll(".main-page-content div").forEach((e=>{e.addEventListener("click",(()=>{sessionStorage.setItem("current",`${e.children[1].textContent}`),sessionStorage.setItem("currentID",`${e.children[1].id}`),t&&new c.Render(t).newGame(),this.startBtnCheck()}))}))}renderPart(){var e;return r(this,void 0,void 0,(function*(){const t=document.createElement("div");t.className="main-page-content";const n=document.querySelectorAll(".burger p"),r=yield fetch("./test.json"),o=yield r.json();console.log(o[1][1].image);let c=0;n.forEach((e=>{t.innerHTML+=`\n      <div>\n      <img src="./images/${e.textContent}/${o[c][0].image.split("/")[1]}">\n        <p id=${c}>${e.textContent}</p>\n      </div>\n      `,c++})),sessionStorage.removeItem("currentWord"),null===(e=document.querySelector("body"))||void 0===e||e.append(t),this.chooseCatBigMenu()}))}renderAgain(){var e,t;return r(this,void 0,void 0,(function*(){null===(e=document.querySelector(".startBTN"))||void 0===e||e.remove(),null===(t=document.querySelector(".repeatBTN"))||void 0===t||t.remove(),yield this.renderPart(),yield(new i.CardsField).clearWithError()}))}startBtnCheck(){return r(this,void 0,void 0,(function*(){const e=document.querySelector("input");(null==e?void 0:e.checked)&&!document.querySelector(".startBTN")&&document.querySelector(".cards")&&(yield this.startBTN())}))}gameMode(){return r(this,void 0,void 0,(function*(){const e=document.querySelector("input");yield null==e?void 0:e.addEventListener("click",(()=>{var t,n;e.checked&&!document.querySelector(".startBTN")&&document.querySelector(".cards")&&(console.log(null==e?void 0:e.checked),this.startBTN()),e.checked||!document.querySelector(".startBTN")&&!document.querySelector(".repeatBTN")||(null===(t=document.querySelector(".startBTN"))||void 0===t||t.remove(),null===(n=document.querySelector(".repeatBTN"))||void 0===n||n.remove(),sessionStorage.setItem("game","0"),sessionStorage.removeItem("currentWord"),document.querySelectorAll(".card").forEach((e=>{e.classList.remove("active")})))}))}))}render(){var e;sessionStorage.setItem("game","0"),"0"===sessionStorage.maincheck?null===(e=document.querySelector("a[href='#main']"))||void 0===e||e.addEventListener("click",(()=>{this.renderAgain()})):(sessionStorage.setItem("maincheck","0"),this.renderAgain()),sessionStorage.firstload||(this.renderPart(),sessionStorage.setItem("firstload","1"));const t=this.createHeader("");return this.conteiner.append(t),this.chooseCat(),this.gameMode(),this.conteiner}}t.MainPage=s},397:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Statistic=void 0;const r=n(163),o=n(351);class c extends r.Page{render(){const e=document.querySelector("body");e&&((new o.CardsField).clearFormainPage(),console.log(e.children[1])),sessionStorage.setItem("maincheck","1"),console.log("31s");const t=this.createHeader("");return this.conteiner.append(t),this.conteiner}}t.Statistic=c},164:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Component=void 0,t.Component=class{constructor(e,t){this.conteiner=document.createElement(e),this.conteiner.className=t}render(){return this.conteiner}}},163:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Page=void 0;class n{constructor(e){this.createHeader=e=>{const t=document.createElement("h1");return t.innerText=e,t},this.conteiner=document.createElement("div"),this.conteiner.id=e}render(){return this.conteiner}}t.Page=n,n.TextObg={}}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var c=t[r]={exports:{}};return e[r].call(c.exports,c,c.exports,n),c.exports}n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(new(n(752).App)).start()})();