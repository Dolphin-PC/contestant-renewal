import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./App";

// redux
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import reducers from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";

// redux-thunk
import reduxThunk from "redux-thunk";

import "bootstrap/dist/css/bootstrap.min.css";

const store = createStore(
   reducers,
   composeWithDevTools(applyMiddleware(reduxThunk))
);

ReactDOM.render(
   <Provider store={store}>
      <App />
   </Provider>,
   document.getElementById("root")
);
