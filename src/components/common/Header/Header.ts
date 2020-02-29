import logo from "../../../assets/img/header-logo.png";
import icon from "../../../assets/img/icon.png";
import close from "../../../assets/img/close-icon.png";

export default class Header extends HTMLElement {
  constructor() {
    super();
    this.create();
  }

  create() {
    // root
    const headerWrap = document.createElement("div");
    headerWrap.setAttribute("class", "HeaderWrap");

    // logo
    const headerLogoWrap = document.createElement("div");
    headerLogoWrap.setAttribute("class", "HeaderLogoWrap");
    headerWrap.appendChild(headerLogoWrap);

    const headerLogo = document.createElement("img");
    headerLogo.setAttribute("class", "HeaderLogo");
    headerLogo.src = logo;
    headerLogoWrap.appendChild(headerLogo);

    // icon
    const headerIconWrap = document.createElement("button");
    headerIconWrap.setAttribute("class", "HeaderIconWrap");
    const headerIcon = document.createElement("img");
    headerIcon.setAttribute("class", "HeaderIcon");
    headerIcon.src = icon;
    headerIconWrap.appendChild(headerIcon);

    // open menu
    headerIconWrap.onclick = () => {
      headerMenuWrap.style.transform = "translateX(0%)";
    };

    headerWrap.appendChild(headerIconWrap);

    // menu
    // menu wrap
    const headerMenuWrap = document.createElement("div");
    headerMenuWrap.setAttribute("class", "HeaderMenuWrap");
    const headerMenuCenter = document.createElement("ul");
    headerMenuCenter.setAttribute("class", "HeaderMenuCenter");
    headerMenuWrap.appendChild(headerMenuCenter);

    // menu text
    const headerMenuTextWrap = document.createElement("li");
    headerMenuTextWrap.setAttribute("class", "HeaderMenuTextWrap");
    const headerMenuText = document.createElement("a");
    headerMenuText.setAttribute("class", "HeaderMenuText");

    // menu close icon
    const headerMenuCloseWrap = document.createElement("button");
    headerMenuCloseWrap.setAttribute("class", "HeaderMenuCloseWrap");
    const headerMenuCloseIcon = document.createElement("img");
    headerMenuCloseIcon.setAttribute("class", "HeaderMenuCloseIcon");
    headerMenuCloseIcon.src = close;
    headerMenuCloseWrap.appendChild(headerMenuCloseIcon);
    
    // close menu
    headerMenuCloseWrap.onclick = () => {
      headerMenuWrap.style.transform = "translateX(-100%)";
    }

    headerMenuWrap.appendChild(headerMenuCloseWrap);
    headerWrap.appendChild(headerMenuWrap);

    // render whole tree
    this.render(headerWrap);
  }

  render(headerWrap: HTMLDivElement) {
    const shadow = this.attachShadow({ mode: "open" });
    
    const headerStyle = document.createElement("style");
    headerStyle.textContent = `
      .HeaderWrap {
        position: fixed;
        width: 100vw;
        height: 64px;
        display: flex;
        align-items: center;
        background: #dbdbdb;
        filter: drop-shadow(0 1px 2px #979797);
      }

      .HeaderLogoWrap {
        width: 100vw;
        height: auto;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .HeaderLogo {
        width: 160px;
        height: auto;
      }

      .HeaderIconWrap {
        position: absolute;
        width: auto;
        height: auto;
        left: 0;
        margin-left: 16px;
        display: flex;
        justify-content: center;
        align-item: center;
        background: none;
        border: 0;
        cursor: pointer;
      }

      .HeaderIcon, .HeaderMenuCloseIcon {
        width: 18px;
        height: auto;
      }

      .HeaderMenuWrap {
        position: absolute;
        top: 0;
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(0, 0, 0, .5);
        transition: transform cubic-bezier(.9,.23,.48,.97) .4s;
        transform: translateX(-100%);
      }

      .HeaderMenuCenter {
        width: 60vw;
        min-width: 640px;
        height: 60vh;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .HeaderMenuCloseWrap {
        position: absolute;
        width: auto;
        height: auto;
        top: 0;
        right: 0;
        margin-top: 24px;
        margin-right: 16px;
        display: flex;
        justify-content: center;
        align-item: center;
        background: none;
        border: 0;
        cursor: pointer;
      }
    `

    shadow.appendChild(headerStyle);
    shadow.appendChild(headerWrap);
  }
}

customElements.define("header-bar", Header);