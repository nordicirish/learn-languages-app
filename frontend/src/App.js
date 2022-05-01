import "./App.css";
import { Outlet, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
const App = () => {
  return (
    <div>
      <nav
        style={{
          borderBottom: "solid 1px",
          padding: "1rem",
          backgroundColor: "#03a9f4",
          fontSize: "2rem",
          textAlign: "center",
          paddingBottom: "1rem",
          marginBottom: "3rem",
          fontFamily: "Tahoma, Verdana, Segoe, sans-serif",
        }}
      >
        <Link to="/">Home</Link> | <Link to="/admin">Admin</Link>
      </nav>
      <Outlet />
    </div>
  );
};

export default App;
