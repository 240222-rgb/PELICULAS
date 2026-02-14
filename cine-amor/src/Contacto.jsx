import "./Contacto.css"

function Contacto() {
  return (
    <div className="contacto">
      <h2>Contáctanos</h2>
      <form>
        <input type="text" placeholder="Tu nombre" />
        <input type="email" placeholder="Tu correo" />
        <textarea placeholder="Escribe tu mensaje"></textarea>
        <button type="submit">Enviar</button>
      </form>

      <div className="info">
        <p>Email: contacto@amorycine.com</p>
        <p>Tel: 55-1234-5678</p>
        <p>Dirección: Av. Romance 123, CDMX</p>
      </div>
    </div>
  )
}

export default Contacto
