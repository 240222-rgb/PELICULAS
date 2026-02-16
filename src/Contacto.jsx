import "./Contacto.css";

function Contacto() {
  return (
    <section className="contacto-section">
      <div className="contacto-container">
        
        {/* Lado Izquierdo: Información */}
        <div className="contacto-info">
          <h2 className="contacto-titulo">¿Tienes alguna duda?</h2>
          <p className="contacto-subtitulo">
            Escríbenos y nuestro equipo de <span>Amor & Cine</span> te contactará lo antes posible.
          </p>
          <div className="info-items">
            <div className="info-item">
              <span className="icon">📍</span>
              <p>Av. Romance 123, Ciudad de México</p>
            </div>
            <div className="info-item">
              <span className="icon">📧</span>
              <p>contacto@amorycine.com</p>
            </div>
          </div>
        </div>

        {/* Lado Derecho: Formulario Pro */}
        <div className="contacto-form-container">
          <form className="contacto-form">
            <div className="input-group">
              <input type="text" placeholder="Tu nombre" required />
            </div>
            <div className="input-group">
              <input type="email" placeholder="Correo electrónico" required />
            </div>
            <div className="input-group">
              <textarea placeholder="¿En qué podemos ayudarte?" rows="4" required></textarea>
            </div>
            <button type="submit" className="btn-enviar">Enviar Mensaje</button>
          </form>
        </div>

      </div>
    </section>
  );
}

export default Contacto;