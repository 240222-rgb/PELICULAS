import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Menu from "./Menu";
import Tarjetas from "./Tarjetas";
import SeccionImagenTexto from "./SeccionImagenTexto";
import Contacto from "./Contacto";
import Footer from "./Footer";

function App() {
  return (
    <Router>
      <div className="App">
        <Menu />
        
        <Routes>
          {/* Ruta principal (Home) */}
          <Route path="/" element={
            <>
              <SeccionImagenTexto />
              <Tarjetas />
            </>
          } />

          {/* Ruta exclusiva para Contacto */}
          <Route path="/contacto" element={<Contacto />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;