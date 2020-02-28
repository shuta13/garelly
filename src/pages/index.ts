import "./index.scss";
import "../components/common/AppImage/AppImage.scss";

const css = new CSSStyleSheet() as any;

class AppImage extends HTMLElement {
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
    this.adaptStyleSheet(appImageWrap);
  };

  adaptStyleSheet(appImageWrap: HTMLDivElement) {
    // new shadow root
    const shadow = this.attachShadow({ mode: "open" });
    // adopt stylesheet
    const shadowRoot = this.shadowRoot as any;
    css.replace(`@import "index.css";`).then(() => {
      shadow.appendChild(appImageWrap);
    });
    shadowRoot.adoptedStyleSheets = [css];
  };
}

customElements.define("app-image", AppImage);