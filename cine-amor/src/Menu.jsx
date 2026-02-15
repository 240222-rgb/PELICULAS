import React from "react";
import { Link } from "react-router-dom"; // Importamos Link
import "./Menu.css";

function Menu() {
  const logoUrl = "https://cdn-icons-png.flaticon.com/512/3163/3163508.png";

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* El logo ahora te regresa a la Home */}
        <Link to="/" className="logo-wrapper" style={{ textDecoration: 'none' }}>
          <img src={logoUrl} alt="Logo" className="navbar-logo-img" />
          <h2 className="logo-text">Amor <span>&</span> Cine</h2>
        </Link>
        
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-links">Inicio</Link>
          </li>
          <li className="nav-item">
            <button className="nav-links">Películas</button>
          </li>
          <li className="nav-item">
            <button className="nav-links">Sucursales</button>
          </li>
          <li className="nav-item">
            {/* Este Link manda a la "página" de contacto */}
            <Link to="/contacto" className="nav-links btn-highlight">
              Contáctanos
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Menu;