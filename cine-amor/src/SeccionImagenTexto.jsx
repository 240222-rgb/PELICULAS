import './SeccionImagenTexto.css';

function SeccionImagenTexto() {
  return (
    <div className="seccion">
      <div className="texto">
        <h2>El poder del amor en el cine</h2>
        <p>
          En Amor & Cine creemos que las historias romanticas nos conectan
          con nuestras emociones mas profundas. Cada pelicula es un viaje
          lleno de pasion, nostalgia y esperanza.
        </p>
      </div>
      <div className="imagen">
        <img src="https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=1200&q=80" alt="cine romantico" />
      </div>
    </div>
  );
}

export default SeccionImagenTexto;
