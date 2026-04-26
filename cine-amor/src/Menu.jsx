import { Link, NavLink } from 'react-router-dom';
import './Menu.css';
import { useAuth } from './AuthContext';

function Menu() {
  const logoUrl = 'https://cdn-icons-png.flaticon.com/512/3163/3163508.png';
  const { isLoggedIn, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo-wrapper" style={{ textDecoration: 'none' }}>
          <img src={logoUrl} alt="Logo" className="navbar-logo-img" />
          <h2 className="logo-text">Amor <span>&</span> Cine</h2>
        </Link>

        <ul className="nav-menu">
          <li className="nav-item">
            <NavLink to="/" className="nav-links">Inicio</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/" className="nav-links">Peliculas</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/favoritos" className="nav-links">Favoritos</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/contacto" className="nav-links">Contacto</NavLink>
          </li>
          {isLoggedIn ? (
            <li className="nav-item">
              <button type="button" className="nav-links btn-highlight" onClick={logout}>
                Cerrar sesion
              </button>
            </li>
          ) : (
            <>
              <li className="nav-item">
                <NavLink to="/login" className="nav-links">Login</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/registro" className="nav-links btn-highlight">Registrate</NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Menu;
