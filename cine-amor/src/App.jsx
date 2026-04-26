import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Menu from './Menu';
import Tarjetas from './Tarjetas';
import SeccionImagenTexto from './SeccionImagenTexto';
import Contacto from './Contacto';
import Footer from './Footer';
import PeliculaDetalle from './PeliculaDetalle';
import Favoritos from './Favoritos';
import Login from './Login';
import Registro from './Registro';

function App() {
  return (
    <Router>
      <div className="App">
        <Menu />
        <Routes>
          <Route
            path="/"
            element={(
              <>
                <SeccionImagenTexto />
                <Tarjetas />
              </>
            )}
          />
          <Route path="/peliculas/:id" element={<PeliculaDetalle />} />
          <Route path="/favoritos" element={<Favoritos />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/contacto" element={<Contacto />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
