import "./AppImage.scss";
import error from "../../../assets/img/error-image.jpg";

const images: Array<string> = [];
for (let i = 0; i < 8; i++) {
  import(`../../../assets/img/works${i}.jpg`)
    .then((works) => {
      console.log(`loaded ${works.default}`);
      images.push(works.default);
    })
    .catch((e) => {
      throw e;
    })
}

export default class AppImage extends HTMLElement {
  constructor() {
    super();
    this.create();
  }

  create() {
    // clip, wrap image dom
    const appImageClip = document.createElement("div");
    appImageClip.setAttribute("part", "AppImageClip");
    const appImageWrap = document.createElement("div");
    appImageWrap.setAttribute("part", "AppImageWrap");

    // insert image
    let imgUrl: string | null = "";
    if (this.hasAttribute("img")) {
      imgUrl = this.getAttribute("img");
    } else {
      imgUrl = error;
    }
    const appImage = document.createElement("img");
    if (imgUrl !== null) appImage.src = imgUrl;
    appImage.setAttribute("part", "AppImage");
    appImageWrap.appendChild(appImage);

    appImageClip.appendChild(appImageWrap);
    this.render(appImageClip);
  };

  render(appImageClip: HTMLDivElement) {
    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(appImageClip);
  };
}

customElements.define("app-image", AppImage);