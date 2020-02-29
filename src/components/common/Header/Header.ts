import logo from "../../../../assets/img/header-logo.png";
import icon from "../../../../assets/img/icon.png";
import closeIcon from "../../../../assets/img/close-icon.png";

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

    // insert logo img
    let logoUrl: string | null = "";
    if (this.hasAttribute("logo")) {
      logoUrl = this.getAttribute("logo");
      this.loadImage(`${logoUrl}`)
        .then(() => {
          if (logo && logoUrl !== null) headerLogo.src = logoUrl;
        })
        .catch((e) => {
          // throw e;
        });
    }

    headerLogoWrap.appendChild(headerLogo);

    // icon
    const headerIconWrap = document.createElement("button");
    headerIconWrap.setAttribute("class", "HeaderIconWrap");
    const headerIcon = document.createElement("img");
    headerIcon.setAttribute("class", "HeaderIcon");

    // insert icon img
    let iconUrl: string | null = "";
    if (this.hasAttribute("icon")) {
      iconUrl = this.getAttribute("icon");
      this.loadImage(`${iconUrl}`)
        .then(() => {
          if (icon && iconUrl !== null) headerIcon.src = iconUrl;
        })
        .catch((e) => {
          // throw e;
        });
    }

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
    const texts = ["home", "graphics"];
    const menuTextWraps: {[key: string]: HTMLLIElement} = {};
    const menuTexts: {[key: string]: HTMLAnchorElement} = {};
    texts.map((text, index) => {
      let textWrapElem = menuTextWraps["headerMenuTextWrap" + index];
      let textElem = menuTexts["headerMenuText" + index];
      let href = "/";
      textWrapElem = document.createElement("li");
      textWrapElem.setAttribute("class", "HeaderMenuTextWrap");
      textElem = document.createElement("a");
      textElem.setAttribute("class", "HeaderMenuText");
      textElem.textContent = text.toUpperCase();
      if (index > 0) href = `/${text}`;
      textElem.href = href;
      textWrapElem.appendChild(textElem);
      headerMenuCenter.appendChild(textWrapElem);

      // color animation
      const defaultColor = "#dbdbdb";
      const onColor = "#3FDF26";
      textElem.onmouseenter = () => {
        textElem.style.color = onColor;
      };
      textElem.onmouseleave = () => {
        textElem.style.color = defaultColor;
      };
      // touch
      textElem.ontouchstart = () => {
        textElem.style.color = onColor;
      };
      textElem.ontouchend = () => {
        textElem.style.color = defaultColor;
      };
    });

    // menu close icon
    const headerMenuCloseWrap = document.createElement("button");
    headerMenuCloseWrap.setAttribute("class", "HeaderMenuCloseWrap");
    const headerMenuCloseIcon = document.createElement("img");
    headerMenuCloseIcon.setAttribute("class", "HeaderMenuCloseIcon");
    
    // insert close icon img
    let closeIconUrl: string | null = "";
    if (this.hasAttribute("close")) {
      closeIconUrl = this.getAttribute("close");
      this.loadImage(`${closeIconUrl}`)
        .then(() => {
          if (closeIcon && closeIconUrl !== null) headerMenuCloseIcon.src = closeIconUrl;
        })
        .catch((e) => {
          // throw e;
        });
    }

    headerMenuCloseWrap.appendChild(headerMenuCloseIcon);
    
    // close menu
    headerMenuCloseWrap.onclick = () => {
      headerMenuWrap.style.transform = "translateX(-100%)";
    }

    // close icon animation
    headerMenuCloseWrap.onmouseenter = () => {
      headerMenuCloseIcon.style.transform = "rotate(360deg)";
    }
    headerMenuCloseWrap.onmouseleave = () => {
      headerMenuCloseIcon.style.transform = "rotate(0deg)";
    }
    // touch
    headerMenuCloseWrap.ontouchstart = () => {
      headerMenuCloseIcon.style.transform = "rotate(360deg)";
    }
    headerMenuCloseWrap.ontouchend = () => {
      headerMenuCloseIcon.style.transform = "rotate(0deg)";
    }

    headerMenuWrap.appendChild(headerMenuCloseWrap);
    headerWrap.appendChild(headerMenuWrap);

    // render whole tree
    this.render(headerWrap);
  }
  
  loadImage(src: string) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(img);
      img.src = src;
    })
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

      .HeaderMenuCloseIcon {
        transition: transform cubic-bezier(.9,.23,.48,.97) .4s;
      }

      .HeaderMenuWrap {
        position: absolute;
        top: 0;
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(0, 0, 0, .6);
        transition: transform cubic-bezier(.9,.23,.48,.97) .4s;
        transform: translateX(-100%);
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

      .HeaderMenuCenter {
        padding: 0;
        width: 60%;
        max-width: 640px;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
      }

      .HeaderMenuTextWrap {
        list-style: none;
        width: 100%;
        height: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 32px 0;
      }

      .HeaderMenuText {
        font-size: 32px;
        font-family: "Sarpanch";
        color: #dbdbdb;
        cursor: pointer;
        text-decoration: none;
        transition: color ease-in-out .2s;
      }
    `

    shadow.appendChild(headerStyle);
    shadow.appendChild(headerWrap);
  }
}

customElements.define("header-bar", Header);