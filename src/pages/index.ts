import "./index.scss";
import "../components/common/AppImage/AppImage.scss";

const css = new CSSStyleSheet() as any;
css.replace(`
  @import "index.css"
`);

class AppImage extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });
    const shadowRoot = this.shadowRoot as any;
    shadowRoot.adoptedStyleSheets = [css];

    const appImageWrap = document.createElement("div");
    appImageWrap.setAttribute("class", "AppImageWrap");
    const appImageInfo = document.createElement("div");
    appImageInfo.setAttribute("class", "AppImageInfo");
    appImageInfo.textContent = "this is app-image";
    appImageWrap.appendChild(appImageInfo);

    shadow.appendChild(appImageWrap);
  }
}

customElements.define("app-image", AppImage);