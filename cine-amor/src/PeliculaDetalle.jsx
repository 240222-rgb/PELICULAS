import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from './Services/api';
import './PeliculaDetalle.css';
import { useAuth } from './AuthContext';

function PeliculaDetalle() {
  const { id } = useParams();
  const [pelicula, setPelicula] = useState(null);
  const [cargando, setCargando] = useState(true);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const obtenerPelicula = async () => {
      try {
        const response = await api.get(`/peliculas/${id}`);
        setPelicula(response.data);
      } catch (error) {
        console.error('Error al obtener detalle de pelicula', error);
      } finally {
        setCargando(false);
      }
    };

    obtenerPelicula();
  }, [id]);

  const guardarEnFavoritos = async () => {
    if (!isLoggedIn) {
      alert('Inicia sesion para guardar favoritos');
      return;
    }

    try {
      await api.post('/favoritos/items', { movieId: pelicula.id });
      alert('Pelicula agregada a favoritos');
    } catch (error) {
      console.error('Error al guardar favorito', error);
      alert('No se pudo guardar la pelicula');
    }
  };

  if (cargando) {
    return <section className="detalle-wrapper"><p>Cargando pelicula...</p></section>;
  }

  if (!pelicula) {
    return <section className="detalle-wrapper"><p>No encontramos esa pelicula.</p></section>;
  }

  return (
    <section className="detalle-wrapper">
      <div className="detalle-card">
        <img src={pelicula.imagen} alt={pelicula.titulo} className="detalle-poster" />
        <div className="detalle-content">
          <Link to="/" className="back-link">Volver al catalogo</Link>
          <p className="detalle-genero">{pelicula.genero?.nombre || 'Sin genero'}</p>
          <h1>{pelicula.titulo}</h1>
          <p className="detalle-descripcion">{pelicula.descripcion}</p>
          <div className="detalle-grid">
            <div><span>Anio</span><strong>{pelicula.anio}</strong></div>
            <div><span>Rating</span><strong>{pelicula.rating}</strong></div>
            <div><span>Director</span><strong>{pelicula.director || 'Sin registrar'}</strong></div>
            <div><span>Duracion</span><strong>{pelicula.duracion_minutos ? `${pelicula.duracion_minutos} min` : 'Sin dato'}</strong></div>
          </div>
          <button type="button" className="detalle-btn" onClick={guardarEnFavoritos}>
            Guardar en favoritos
          </button>
        </div>
      </div>
    </section>
  );
}

export default PeliculaDetalle;
