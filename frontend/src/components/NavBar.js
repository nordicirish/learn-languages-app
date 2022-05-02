import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/esm/Container";

// import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="/">
          <h1>Learn Languages App</h1>
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Item>
            <Nav.Link href="/">Home</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-1" href="/admin">
              Admin
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar>
    </>
  );
};

export default NavBar;
