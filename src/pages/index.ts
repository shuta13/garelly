import "./index.scss";
import "../components/common/AppImage/AppImage.scss";

class AppImage extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });

    const appImageWrap = document.createElement("div");
    appImageWrap.setAttribute("class", "AppImageWrap");
    const appImageInfo = document.createElement("div");
    appImageInfo.setAttribute("class", "AppImageInfo");
    appImageInfo.textContent = "this is app-image";
    appImageWrap.appendChild(appImageInfo);

    shadow.appendChild(appImageWrap)
  }
}

customElements.define("app-image", AppImage);