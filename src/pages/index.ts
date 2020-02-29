import "./index.scss";
import "../../assets/img/ogp.jpg";

import Loading from "../components/partials/Loading/Loading";
new Loading();

import Header from "../components/common/Header/Header";
new Header();

import AppImage from "../components/common/AppImage/AppImage";
new AppImage();

// service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(registration => {
      console.log('SW registered: ', registration);
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError);
    });
  });
}