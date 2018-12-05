import React from "react";
import { render } from "react-dom";
import { AppContainer } from "react-hot-loader";
import smoothScrollPolyfill from "smoothscroll-polyfill";

import "styles/bootstrap.css";
import "styles/layout.css";
import "styles/topbar.css";
import "styles/sidebar.css";
import "styles/leaflet_1.0.0.css";

import symbols from 'img/symbols.txt';

const renderSymbols = (symbols) => { 
  document.getElementById("symbols").innerHTML = symbols;
};

import Root from "./Root";

const BootstrapedElement = document.getElementById("root");

smoothScrollPolyfill.polyfill();
window.__forceSmoothScrollPolyfill__ = true;

const renderApp = RootComponent => {
  render(
    <AppContainer warnings={false}>
      <RootComponent />
    </AppContainer>,
    BootstrapedElement
  );
};

renderApp(Root);
renderSymbols(symbols);

if (module.hot) {
  module.hot.accept("./Root", () => {
    const RootComponent = require("./Root").default;
    renderApp(RootComponent);
  });
}