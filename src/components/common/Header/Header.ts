import logo from "../../../assets/img/header-logo.png";
import icon from "../../../assets/img/icon.png";

export default class Header extends HTMLElement {
  constructor() {
    super();
    this.create();
  }

  create() {
    const headerWrap = document.createElement("div");
    headerWrap.setAttribute("class", "HeaderWrap");
    const headerLogoWrap = document.createElement("div");
    headerLogoWrap.setAttribute("class", "HeaderLogoWrap");
    const headerLogo = document.createElement("img");
    headerLogo.setAttribute("class", "HeaderLogo");
    headerLogo.src = logo;
    const headerIcon = document.createElement("img");
    headerIcon.setAttribute("class", "HeaderIcon");
    headerIcon.src = icon;
    headerLogoWrap.appendChild(headerLogo);
    headerWrap.appendChild(headerLogoWrap);
    headerWrap.appendChild(headerIcon);

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
        width: 176px;
        height: auto;
      }

      .HeaderIcon {
        position: absolute;
        right: 0;
        width: 20px;
        height: auto;
        margin-right: 32px;
      }
    `

    shadow.appendChild(headerStyle);
    shadow.appendChild(headerWrap);
  }
}

customElements.define("header-bar", Header);