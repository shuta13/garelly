import error from "../../../assets/img/error-image.jpg";

const images: Array<string> = [];
for (let i = 0; i < 8; i++) {
  import(`../../../assets/img/works${i}.jpg`)
    .then((works) => {
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
    appImageClip.setAttribute("class", "AppImageClip");
    const appImageWrap = document.createElement("div");
    appImageWrap.setAttribute("part", "AppImageWrap");
    appImageWrap.setAttribute("class", "AppImageWrap");

    // insert image
    let imgUrl: string | null = "";
    if (this.hasAttribute("img")) {
      imgUrl = this.getAttribute("img");
      console.log(imgUrl);
      this.loadImage(`${imgUrl}`)
        .then(() => {
          const appImage = document.createElement("img");
          if (imgUrl !== null) appImage.src = imgUrl;
          appImage.setAttribute("part", "AppImage");
          appImage.setAttribute("class", "AppImage");
          appImageWrap.appendChild(appImage);
        })
        .catch((e) => {
          // throw e;
        });
    } else {
      imgUrl = error;
    }

    appImageClip.appendChild(appImageWrap);
    this.render(appImageClip);
  };

  loadImage(src: string) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(img);
      img.src = src;
    })
  }

  render(appImageClip: HTMLDivElement) {
    const shadow = this.attachShadow({ mode: "open" });

    // style for Safari, touch devices...
    const appImageStyle = document.createElement("style");
    appImageStyle.textContent = `
      .AppImageClip {
        max-width: 464px;
        max-height: 232px;
        width: 80vw;
        height: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 48px;
        overflow: hidden;
        background: #1d1d1d;
        color: #fff;
      }

      .AppImageWrap {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .AppImage {
        width: 100%;
      }
    `;
    shadow.appendChild(appImageStyle);
    
    shadow.appendChild(appImageClip);
  };
}

customElements.define("app-image", AppImage);