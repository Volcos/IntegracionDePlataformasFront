// autoparts/client/src/pages/Login/LoginPage.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Para el enlace "Regístrate aquí"
import styles from './LoginPage.module.css'; // Estilos específicos de la página de Login
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function LoginPage() {

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const credentials = {
      email: formData.get('email'),
      contrasena: formData.get('password'),
    };
    console.log(credentials.email)
    console.log(credentials.contrasena)

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/buscarUsuario`, {email:credentials.email,contrasena:credentials.contrasena});
      const token = response.data.token;

      localStorage.setItem('token', token);

      alert('Inicio de sesión exitoso');

      navigate('/'); 
    } catch (error) {
      console.error('Error de inicio de sesión:', error);
      alert('Correo o contraseña incorrectos');
    }
  };


  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <h1 className={styles.loginTitle}>Ingresar</h1>
        <form className={styles.loginForm} on onSubmit={handleLogin}>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.formLabel}>Correo Electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              className={styles.formInput}
              placeholder="tu@ejemplo.com"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.formLabel}>Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              className={styles.formInput}
              placeholder="••••••••"
              required
            />
          </div>
          <button type="submit" className={styles.submitButton}>Ingresar</button>
        </form>

        <p className={styles.registerText}>
          Aún no tienes cuenta? {' '}
          <Link to="/register" className={styles.registerLink}>
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;