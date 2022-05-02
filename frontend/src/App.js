import "./App.css";
// import { Outlet, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/esm/Container";

function App() {
  return (
    <Container className="container">
      <div className="box">
        <NavBar />
        <Outlet />
      </div>
    </Container>
  );
}
export default App;
