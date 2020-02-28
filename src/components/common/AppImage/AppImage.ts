import "./AppImage.scss";

const css = new CSSStyleSheet() as any;

export default class AppImage extends HTMLElement {
  constructor() {
    super();
    this.createDOMTree();
  }

  createDOMTree() {
    const appImageWrap = document.createElement("div");
    appImageWrap.setAttribute("class", "AppImageWrap");
    const appImageInfo = document.createElement("div");
    appImageInfo.setAttribute("class", "AppImageInfo");
    appImageInfo.textContent = "this is app-image";
    appImageWrap.appendChild(appImageInfo);
    this.render(appImageWrap);
  };

  render(appImageWrap: HTMLDivElement) {
    const shadow = this.attachShadow({ mode: "open" });
    const shadowRoot = this.shadowRoot as any;
    css.replace(`@import "index.css";`).then(() => {
      shadow.appendChild(appImageWrap);
    });
    shadowRoot.adoptedStyleSheets = [css];
  };
}

customElements.define("app-image", AppImage);