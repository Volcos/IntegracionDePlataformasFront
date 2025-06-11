// autoparts/client/src/pages/WarehouseLogin/WarehouseLoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Para redireccionar después del login
import styles from './WarehouseLoginPage.module.css'; // Estilos específicos de la página de Login de Bodeguero

function WarehouseLoginPage({ setIsWarehouseLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError(''); // Limpiar errores previos

    // Simulación de login: en el futuro, esto consultará el web service
    if (username === 'bodeguero' && password === 'pass123') {
      setIsWarehouseLoggedIn(true); // Actualiza el estado en App.jsx
      navigate('/warehouse/inventory'); // Redirige al inventario
    } else {
      setError('Credenciales incorrectas. Intenta con "bodeguero" / "pass123".');
    }
  };

  return (
    <div className={styles.warehouseLoginContainer}>
      <div className={styles.loginCard}>
        <h1 className={styles.loginTitle}>Acceso de Bodeguero</h1>
        <p className={styles.loginSubtitle}>Ingresa tus credenciales para acceder al inventario.</p>
        <form className={styles.loginForm} onSubmit={handleLogin}>
          <div className={styles.formGroup}>
            <label htmlFor="username" className={styles.formLabel}>Usuario</label>
            <input
              type="text"
              id="username"
              name="username"
              className={styles.formInput}
              placeholder="Nombre de usuario o correo"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className={styles.errorMessage}>{error}</p>}
          <button type="submit" className={styles.submitButton}>Iniciar Sesión</button>
        </form>
      </div>
    </div>
  );
}

export default WarehouseLoginPage;