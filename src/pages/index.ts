import { hello } from "../components/partials/Hello";
import AppImage from "../components/common/AppImage/AppImage";

import "./index.scss";

console.log("f*ck up, sh*t");

const greet = () => {
  console.log("ほほほ");
};

greet();
hello();

document.body.innerHTML = AppImage;