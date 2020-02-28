import "./index.scss";
import "../components/common/AppImage/AppImage.scss";

const css = new CSSStyleSheet() as any;
css.replace(`
  @import "index.css"
`);

class AppImage extends HTMLElement {
  constructor() {
    super();

    // new shadow root
    const shadow = this.attachShadow({ mode: "open" });

    // adopt stylesheet
    const shadowRoot = this.shadowRoot as any;
    shadowRoot.adoptedStyleSheets = [css];

    // make shadow dom tree
    const appImageWrap = document.createElement("div");
    appImageWrap.setAttribute("class", "AppImageWrap");
    const appImageInfo = document.createElement("div");
    appImageInfo.setAttribute("class", "AppImageInfo");
    appImageInfo.textContent = "this is app-image";
    appImageWrap.appendChild(appImageInfo);

    // append shadow dom tree
    shadow.appendChild(appImageWrap);
  }
}

customElements.define("app-image", AppImage);