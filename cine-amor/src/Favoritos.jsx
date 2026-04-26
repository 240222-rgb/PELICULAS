import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import api from './Services/api';
import { useAuth } from './AuthContext';
import './Favoritos.css';

function Favoritos() {
  const [favoritos, setFavoritos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const { isLoggedIn } = useAuth();

  const cargarFavoritos = async () => {
    try {
      const response = await api.get('/favoritos');
      setFavoritos(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error al obtener favoritos', error);
      setFavoritos([]);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      setCargando(false);
      return;
    }

    cargarFavoritos();
  }, [isLoggedIn]);

  const peliculas = useMemo(() => favoritos.flatMap((favorito) =>
    favorito.movies.map((item) => ({
      favoriteId: favorito.id,
      ...item.movie,
    }))
  ), [favoritos]);

  const eliminar = async (favoriteId, movieId) => {
    try {
      await api.delete(`/favoritos/${favoriteId}/peliculas/${movieId}`);
      cargarFavoritos();
    } catch (error) {
      console.error('Error al eliminar favorito', error);
      alert('No se pudo eliminar la pelicula');
    }
  };

  if (!isLoggedIn) {
    return (
      <section className="favoritos-wrapper">
        <div className="favoritos-empty">
          <h2>Tu lista romantica te espera</h2>
          <p>Inicia sesion para guardar y revisar tus peliculas favoritas.</p>
          <Link to="/login" className="favoritos-link">Ir a login</Link>
        </div>
      </section>
    );
  }

  if (cargando) {
    return <section className="favoritos-wrapper"><p>Cargando favoritos...</p></section>;
  }

  return (
    <section className="favoritos-wrapper">
      <div className="favoritos-header">
        <h2>Mi watchlist romantica</h2>
        <p>Estas son las peliculas que guardaste para volver a sentirlas.</p>
      </div>

      {peliculas.length === 0 ? (
        <div className="favoritos-empty">
          <p>Aun no has guardado peliculas.</p>
          <Link to="/" className="favoritos-link">Explorar catalogo</Link>
        </div>
      ) : (
        <div className="favoritos-grid">
          {peliculas.map((pelicula) => (
            <article key={`${pelicula.favoriteId}-${pelicula.id}`} className="favorito-card">
              <img src={pelicula.imagen} alt={pelicula.titulo} />
              <div>
                <p className="favorito-genero">{pelicula.genero?.nombre || 'Sin genero'}</p>
                <h3>{pelicula.titulo}</h3>
                <p>{pelicula.descripcion}</p>
                <div className="favorito-actions">
                  <Link to={`/peliculas/${pelicula.id}`} className="favoritos-link alt">Ver detalle</Link>
                  <button type="button" className="remove-btn" onClick={() => eliminar(pelicula.favoriteId, pelicula.id)}>
                    Quitar
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default Favoritos;
