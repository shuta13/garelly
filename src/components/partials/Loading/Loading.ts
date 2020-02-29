import logo from "../../../assets/img/loading-logo.png";

export default class Loading extends HTMLElement {
  constructor() {
    super();

    this.create();
  }

  create() {
    const LoadingWrap = document.createElement("div");
    LoadingWrap.setAttribute("class", "LoadingWrap LoadingWrapFinished");

    const LoadingLogo = document.createElement("img");
    LoadingLogo.setAttribute("class", "LoadingLogo LoadingLogoFinished");
    LoadingLogo.src = logo;
    LoadingWrap.appendChild(LoadingLogo);

    this.render(LoadingWrap);
  }

  render(LoadingWrap: HTMLDivElement) {
    const shadow = this.attachShadow({ mode: "open" });

    this.setWillAnimate(shadow);

    const LoadingStyle = document.createElement("style");
    LoadingStyle.textContent = `
      .LoadingWrap {
        position: absolute;
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        top: 0;
        background: #dbdbdb;
        transition: transform cubic-bezier(.9,.23,.48,.97) .8s;
        transition-delay: .8s;
      }

      .LoadingLogo {
        width: 160px;
        height: auto;
        transition: opacity cubic-bezier(.9,.23,.48,.97) .4s, transform cubic-bezier(.9,.23,.48,.97) .8s;
        transition-delay: .4s;
      }
    `;
    shadow.appendChild(LoadingStyle);

    shadow.appendChild(LoadingWrap);
  };

  setWillAnimate(shadow: ShadowRoot) {
    window.addEventListener("load", () => {
      const LoadingTextFinishedStyle = document.createElement("style");
      LoadingTextFinishedStyle.textContent = `
        .LoadingLogoFinished {
          transform: translateY(100%);
          opacity: 0;
        }
      `;
      shadow.appendChild(LoadingTextFinishedStyle);

      const LoadingWrapFinishedStyle = document.createElement("style");
      LoadingWrapFinishedStyle.textContent = `
        .LoadingWrapFinished {
          transform: translateX(100%);
        }
      `;
      shadow.appendChild(LoadingWrapFinishedStyle);
    });
  }
};

customElements.define("loading-page", Loading);