export default class Loading extends HTMLElement {
  constructor() {
    super();

    this.create();
  }

  create() {
    const LoadingWrap = document.createElement("div");
    LoadingWrap.setAttribute("class", "LoadingWrap LoadingFinished");

    const LoadingText = document.createElement("div");
    LoadingText.setAttribute("class", "LoadingText");
    LoadingText.textContent = "Loading...";
    LoadingWrap.appendChild(LoadingText);

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
      }

      .LoadingText {
        font-size: 32px;
        color: #1d1d1d;
      }
    `;
    shadow.appendChild(LoadingStyle);

    shadow.appendChild(LoadingWrap);
  };

  setWillAnimate(shadow: ShadowRoot) {
    window.addEventListener("load", () => {
      const LoadingFinishedStyle = document.createElement("style");
      LoadingFinishedStyle.textContent = `
        .LoadingFinished {
          z-index: -1;
        }
      `;
      shadow.appendChild(LoadingFinishedStyle);
    })
  }
};

customElements.define("loading-page", Loading);