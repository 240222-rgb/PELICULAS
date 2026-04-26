import './Contacto.css';

function Contacto() {
  const handleSubmit = (event) => {
    event.preventDefault();
    alert('Gracias por escribirnos. Muy pronto tendras respuesta.');
  };

  return (
    <section className="contacto-section">
      <div className="contacto-container">
        <div className="contacto-info">
          <h2 className="contacto-titulo">Tienes alguna duda?</h2>
          <p className="contacto-subtitulo">
            Escribenos y nuestro equipo de <span>Amor & Cine</span> te contactara lo antes posible.
          </p>
          <div className="info-items">
            <div className="info-item">
              <span className="icon">[ ]</span>
              <p>Av. Romance 123, Ciudad de Mexico</p>
            </div>
            <div className="info-item">
              <span className="icon">[@]</span>
              <p>contacto@amorycine.com</p>
            </div>
          </div>
        </div>

        <div className="contacto-form-container">
          <form className="contacto-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <input type="text" placeholder="Tu nombre" required />
            </div>
            <div className="input-group">
              <input type="email" placeholder="Correo electronico" required />
            </div>
            <div className="input-group">
              <textarea placeholder="En que podemos ayudarte?" rows="4" required />
            </div>
            <button type="submit" className="btn-enviar">Enviar Mensaje</button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contacto;
