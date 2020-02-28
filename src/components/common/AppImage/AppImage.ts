import "./AppImage.scss";

const css = new CSSStyleSheet() as any;

export default class AppImage extends HTMLElement {
  constructor() {
    super();
    this.create();
  }

  create() {
    const appImageClip = document.createElement("div");
    appImageClip.setAttribute("class", "AppImageClip");
    const appImageWrap = document.createElement("div");
    appImageWrap.setAttribute("class", "AppImageWrap");
    appImageClip.appendChild(appImageWrap);
    this.render(appImageClip);
  };

  render(appImageClip: HTMLDivElement) {
    const shadow = this.attachShadow({ mode: "open" });
    const shadowRoot = this.shadowRoot as any;
    css.replace(`@import "index.css";`).then(() => {
      shadow.appendChild(appImageClip);
    });
    shadowRoot.adoptedStyleSheets = [css];
  };
}

customElements.define("app-image", AppImage);