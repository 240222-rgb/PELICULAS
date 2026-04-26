import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from './Services/api';
import './Login.css';

function Registro() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: '',
    direccion: '',
    telefono: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (event) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setError('');
      await api.post('/usuarios', { ...form, rol: 'cliente' });
      alert('Cuenta creada con exito. Ahora inicia sesion.');
      navigate('/login');
    } catch (requestError) {
      console.error('Error en registro', requestError);
      setError(requestError.response?.data?.message || 'No se pudo crear la cuenta.');
    }
  };

  return (
    <section className="auth-shell">
      <form className="auth-card" onSubmit={handleSubmit}>
        <p className="auth-kicker">Crear cuenta</p>
        <h1>Tu club de cine romantico</h1>
        <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre completo" required />
        <input name="direccion" value={form.direccion} onChange={handleChange} placeholder="Direccion" required />
        <input name="telefono" value={form.telefono} onChange={handleChange} placeholder="Telefono" required />
        <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Correo electronico" required />
        <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Contrasena" required />
        {error ? <p className="auth-error">{error}</p> : null}
        <button type="submit">Crear cuenta</button>
        <p className="auth-footer">Ya tienes cuenta? <Link to="/login">Inicia sesion</Link></p>
      </form>
    </section>
  );
}

export default Registro;
