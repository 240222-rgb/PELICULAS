import "./Tarjetas.css"

function Tarjetas() {
  const peliculas = [
    {
      titulo: "Titanic",
      año: "1997",
      descripcion: "Una historia de amor imposible a bordo del barco más famoso del mundo.",
      imagen: "https://image.tmdb.org/t/p/w500/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg"
    },
    {
      titulo: "The Notebook",
      año: "2004",
      descripcion: "Una historia intensa sobre el amor eterno que supera el tiempo.",
      imagen: "https://image.tmdb.org/t/p/w500/qom1SZSENdmHFNZBXbtJAU0WTlC.jpg"
    },
    {
      titulo: "Pride & Prejudice",
      año: "2005",
      descripcion: "Romance clásico basado en la novela de Jane Austen.",
      imagen: "https://image.tmdb.org/t/p/w500/sGjIvtVvTlWnia2zfJfHz81pZ9Q.jpg"
    },
    {
      titulo: "La La Land",
      año: "2016",
      descripcion: "Una historia de amor entre sueños y música en Los Ángeles.",
      imagen: "https://image.tmdb.org/t/p/w500/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg"
    }
  ]

  return (
    <div className="tarjetas-container">
      {peliculas.map((pelicula, index) => (
        <div className="card" key={index}>
          <img src={pelicula.imagen} alt={pelicula.titulo} />
          <h3>{pelicula.titulo}</h3>
          <p><strong>Año:</strong> {pelicula.año}</p>
          <p>{pelicula.descripcion}</p>
        </div>
      ))}
    </div>
  )
}

export default Tarjetas
