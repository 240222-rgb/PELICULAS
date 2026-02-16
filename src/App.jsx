import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Menu from "./Menu";
import SeccionImagenTexto from "./SeccionImagenTexto";
import Tarjetas from "./Tarjetas";
import Contacto from "./Contacto";
import Footer from "./Footer";
import Peliculas from "./Peliculas";
import Sucursales from "./sucursales";


function App() {
  return (
    <Router>
      <div className="App">
        <Menu />
        
        <Routes>
          <Route 
            path="/" 
            element={
              <>
                <SeccionImagenTexto />
                <Tarjetas />
              </>
            } 
          />

          <Route path="/peliculas" element={<Peliculas />} />
          <Route path="/sucursales" element={<Sucursales />} />
          <Route path="/contacto" element={<Contacto />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;