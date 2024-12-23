import './x-logger'
console.xlog(`hello-world app loaded!`)

import { AppUiProvider } from "@canva/app-ui-kit";
import { createRoot } from "react-dom/client";
import { App } from "./app";
import "@canva/app-ui-kit/styles.css";
import { AppI18nProvider } from "@canva/app-i18n-kit";

import './index.css';

const root = createRoot(document.getElementById("root") as Element);
function render() {
  root.render(
    <AppI18nProvider>
      <AppUiProvider>
        <App />
      </AppUiProvider>
    </AppI18nProvider>,
  );
}

render();

if (module.hot) {
  module.hot.accept("./app", render);
}
