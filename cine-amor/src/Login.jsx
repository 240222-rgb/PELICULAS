import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from './Services/api';
import { useAuth } from './AuthContext';
import './Login.css';

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setError('');
      const response = await api.post('/login', { email, password });
      login(response.data);
      navigate('/favoritos');
    } catch (requestError) {
      console.error('Error en login', requestError);
      setError('No pudimos iniciar sesion con esos datos.');
    }
  };

  return (
    <section className="auth-shell">
      <form className="auth-card" onSubmit={handleSubmit}>
        <p className="auth-kicker">Cine Amor</p>
        <h1>Vuelve a tu lista favorita</h1>
        <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Correo electronico" required />
        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Contrasena" required />
        {error ? <p className="auth-error">{error}</p> : null}
        <button type="submit">Entrar</button>
        <p className="auth-footer">Aun no tienes cuenta? <Link to="/registro">Registrate</Link></p>
      </form>
    </section>
  );
}

export default Login;
