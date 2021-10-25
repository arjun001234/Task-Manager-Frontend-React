import React from "react";
import ReactDOM from "react-dom";
import { TaskContextProvider } from "./context/useContext";
import App from "./App"; 
import RequestsProvider from './context/requestContext';
import { Provider } from "react-redux";
import store from './Redux/store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <TaskContextProvider>
      <RequestsProvider>
      <App />
      </RequestsProvider>
    </TaskContextProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
