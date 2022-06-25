import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import UserStore from "./store/UserStore";
import DeviceStore from "./store/DeviceStore";
import CountryStore from "./store/CountryStore";
import SightStore from "./store/SightStore";
export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Context.Provider
      value={{
        user: new UserStore(),
        device: new DeviceStore(),
        country: new CountryStore(),
        sight:new SightStore()
      }}
    >
      <App />
    </Context.Provider>
  </React.StrictMode>
);
