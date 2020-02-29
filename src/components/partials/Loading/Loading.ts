export default class Loading extends HTMLElement {
  constructor() {
    super();

    this.create();
  }

  create() {
    const LoadingWrap = document.createElement("div");
    LoadingWrap.setAttribute("class", "LoadingWrap LoadingWrapFinished");

    const LoadingText = document.createElement("div");
    LoadingText.setAttribute("class", "LoadingText LoadingTextFinished");
    LoadingText.textContent = "loAdinG";
    LoadingWrap.appendChild(LoadingText);

    this.render(LoadingWrap);
  }

  render(LoadingWrap: HTMLDivElement) {
    const shadow = this.attachShadow({ mode: "open" });

    this.setWillAnimate(shadow);

    const LoadingStyle = document.createElement("style");
    LoadingStyle.textContent = `
      .LoadingWrap {
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        top: 0;
        background: #dbdbdb;
        transition: transform cubic-bezier(.56,.11,.45,.86) .8s;
      }

      .LoadingText {
        font-size: 32px;
        font-family: "Major Mono Display";
        color: #1d1d1d;
        transition: opacity cubic-bezier(.56,.11,.45,.86) .4s;
      }
    `;
    shadow.appendChild(LoadingStyle);

    shadow.appendChild(LoadingWrap);
  };

  setWillAnimate(shadow: ShadowRoot) {
    window.addEventListener("load", () => {
      const LoadingTextFinishedStyle = document.createElement("style");
      LoadingTextFinishedStyle.textContent = `
        .LoadingTextFinished {
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