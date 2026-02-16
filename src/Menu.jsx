import { Link } from "react-router-dom";
import "./Menu.css";

function Menu() {
  return (
    <nav className="navbar">
      <div className="logo-wrapper">
        <img src="/logo.png" alt="logo" className="navbar-logo-img" />
        <span className="logo-text">
          Amor <span>&</span> Cine
        </span>
      </div>

      <div className="nav-links">
        <Link to="/" className="nav-links">Inicio</Link>
<Link to="/peliculas" className="nav-links">Películas</Link>
<Link to="/sucursales" className="nav-links">Sucursales</Link>
<Link to="/contacto" className="nav-links btn-highlight">
  Contáctanos
</Link>

      </div>
    </nav>
  );
}

export default Menu;