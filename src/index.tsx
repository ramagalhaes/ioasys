import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import AuthProvider from "../src/services/AuthContext";
import Router from "./router/Router";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <Router />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
