import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./App";

// redux
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducers from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(reducers, composeWithDevTools());

ReactDOM.render(
   <React.StrictMode>
      <Provider store={store}>
         <App />
      </Provider>
   </React.StrictMode>,
   document.getElementById("root")
);
