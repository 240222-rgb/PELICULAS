import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import './Tarjetas.css';
import api from './Services/api';
import { useAuth } from './AuthContext';

function Tarjetas() {
  const [peliculas, setPeliculas] = useState([]);
  const [filtroGenero, setFiltroGenero] = useState('todos');
  const [cargando, setCargando] = useState(true);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const obtenerPeliculas = async () => {
      try {
        const response = await api.get('/peliculas');
        setPeliculas(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Error al obtener peliculas', error);
      } finally {
        setCargando(false);
      }
    };

    obtenerPeliculas();
  }, []);

  const generos = useMemo(() => {
    const valores = peliculas.map((pelicula) => pelicula.genero?.nombre).filter(Boolean);
    return ['todos', ...new Set(valores)];
  }, [peliculas]);

  const peliculasFiltradas = peliculas.filter((pelicula) => {
    if (filtroGenero === 'todos') {
      return true;
    }

    return pelicula.genero?.nombre === filtroGenero;
  });

  const guardarEnFavoritos = async (movieId) => {
    if (!isLoggedIn) {
      alert('Inicia sesion para guardar favoritos');
      return;
    }

    try {
      await api.post('/favoritos/items', { movieId });
      alert('Pelicula agregada a favoritos');
    } catch (error) {
      console.error('Error al agregar favorito', error);
      alert('No se pudo guardar en favoritos');
    }
  };

  if (cargando) {
    return <section className="main-wrapper"><p className="empty-state">Cargando peliculas...</p></section>;
  }

  return (
    <div className="main-wrapper">
      <div className="tarjetas-header">
        <div>
          <h2 className="seccion-titulo">Catalogo romantico</h2>
          <p className="seccion-subtitulo">Descubre peliculas, revisa sus detalles y arma tu watchlist personal.</p>
        </div>
        <label className="genre-filter">
          <span>Genero</span>
          <select value={filtroGenero} onChange={(event) => setFiltroGenero(event.target.value)}>
            {generos.map((genero) => (
              <option key={genero} value={genero}>
                {genero === 'todos' ? 'Todos' : genero}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="tarjetas-grid">
        {peliculasFiltradas.map((pelicula) => (
          <div className="card-pro" key={pelicula.id}>
            <div className="card-img-container">
              <img src={pelicula.imagen} alt={pelicula.titulo} />
              <div className="card-overlay">
                <Link to={`/peliculas/${pelicula.id}`} className="btn-play">Ver detalle</Link>
              </div>
            </div>
            <div className="card-info">
              <h3>{pelicula.titulo}</h3>
              <span className="badge-anio">{pelicula.anio}</span>
              <p className="genre-chip">{pelicula.genero?.nombre || 'Sin genero'}</p>
              <p>{pelicula.descripcion}</p>
              <div className="card-meta">
                <span>Rating {pelicula.rating}</span>
                <span>{pelicula.director || 'Direccion no disponible'}</span>
              </div>
              <div className="card-actions">
                <Link to={`/peliculas/${pelicula.id}`} className="btn-secondary">Leer mas</Link>
                <button type="button" className="btn-favorite" onClick={() => guardarEnFavoritos(pelicula.id)}>
                  Guardar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {peliculasFiltradas.length === 0 ? <p className="empty-state">No hay peliculas para ese genero.</p> : null}
    </div>
  );
}

export default Tarjetas;
