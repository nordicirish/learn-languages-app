import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import AdminForm from "./routes/admin";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/admin" element={<AdminForm />} />
          {/* <Route path="completed" element={<Completed />} />
          <Route path="incomplete" element={<Incomplete />} />
          <Route path="app-info" element={<Info />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
    , rootElement );
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
