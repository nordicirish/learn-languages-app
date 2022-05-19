import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/esm/Container";

function App() {
  return (
    <Container className="main-container">
      <div className="page-box">
        <NavBar />
        {/* outlet is a holder for the routed content  */}
        <Outlet />
      </div>
    </Container>
  );
}
export default App;
