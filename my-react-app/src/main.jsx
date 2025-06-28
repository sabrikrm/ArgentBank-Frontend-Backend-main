import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { store } from "./state/store.js";
import { Provider } from "react-redux";

import App from "./App.jsx";
//provider envoloppe redux//
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
