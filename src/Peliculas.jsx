import "./Peliculas.css";

function Peliculas() {
  const peliculas = [
    {
      titulo: "Cuestión de Tiempo",
      año: "2013",
      descripcion: "Un joven descubre que puede viajar en el tiempo y decide usar su don para encontrar el amor verdadero.",
      imagen: "https://images.justwatch.com/poster/246770187/s718/una-cuestion-de-tiempo.jpg"
    },
    {
      titulo: "Yo Antes de Ti",
      año: "2016",
      descripcion: "Una joven llena de vida cambia la perspectiva de un hombre que ha perdido la esperanza.",
      imagen: "https://play-lh.googleusercontent.com/9fX_4vPaf_FhS79QBE0ZDszOT6h8aKeGQuEcdLRFyttkqjaNHSF9RfFimVZiF8G2bWZJ"
    },
    {
      titulo: "Votos de Amor",
      año: "2012",
      descripcion: "Después de un accidente, ella pierde la memoria y él intenta enamorarla nuevamente.",
      imagen: "https://pics.filmaffinity.com/the_vow-179178511-large.jpg"
    },
    {
      titulo: "A Dos Metros de Ti",
      año: "2019",
      descripcion: "Dos adolescentes con enfermedades crónicas se enamoran, pero deben mantenerse separados.",
      imagen: "https://es.web.img2.acsta.net/pictures/19/07/09/11/20/1553026.jpg"
    },
    {
      titulo: "De Amor y Otras Drogas",
      año: "2010",
      descripcion: "Una historia intensa donde el amor surge en medio del caos y la enfermedad.",
      imagen: "https://es.web.img3.acsta.net/medias/nmedia/18/82/04/80/19634715.jpg"
    },
    {
      titulo: "La Casa del Lago",
      año: "2006",
      descripcion: "Dos personas se enamoran a través de cartas, aunque viven en tiempos distintos.",
      imagen: "https://images.justwatch.com/poster/124284672/s718/la-casa-del-lago.jpg"
    },
    {
      titulo: "¿Conoces a Joe Black?",
      año: "1998",
      descripcion: "La muerte toma forma humana y experimenta el amor por primera vez.",
      imagen: "https://image.tmdb.org/t/p/w500/fDPAjvfPMomkKF7cMRmL5Anak61.jpg"
    },
    {
      titulo: "Diario de una Pasión",
      año: "2004",
      descripcion: "Un amor que resiste el paso del tiempo y las diferencias sociales.",
      imagen: "https://pics.filmaffinity.com/the_notebook-565006977-large.jpg"
    },
    {
      titulo: "Orgullo y Prejuicio",
      año: "2005",
      descripcion: "Elizabeth Bennet y el Sr. Darcy enfrentan orgullo, prejuicio y amor.",
      imagen: "https://image.tmdb.org/t/p/w500/sGjIvtVvTlWnia2zfJfHz81pZ9Q.jpg"
    },
    {
      titulo: "La La Land",
      año: "2016",
      descripcion: "Un romance entre sueños, música y decisiones difíciles en Los Ángeles.",
      imagen: "https://image.tmdb.org/t/p/w500/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg"
    }
  ];

  return (
    <section className="peliculas-page">
      <div className="peliculas-header">
        <h1>Catálogo Romántico</h1>
        <p>Historias que nos recuerdan que amar siempre vale la pena.</p>
      </div>

      <div className="peliculas-container">
        {peliculas.map((pelicula, index) => (
          <div className="pelicula-card" key={index}>
            <div className="pelicula-img">
              <img src={pelicula.imagen} alt={pelicula.titulo} />
              <div className="pelicula-overlay">
                <button className="btn-ver">Ver ahora</button>
              </div>
            </div>

            <div className="pelicula-info">
              <h3>{pelicula.titulo}</h3>
              <span className="badge">{pelicula.año}</span>
              <p>{pelicula.descripcion}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Peliculas;