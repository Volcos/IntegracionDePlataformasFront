import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';

function Header() {
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  // Decodificar el JWT para extraer nombre
  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };

  const user = token ? parseJwt(token) : null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login'); // Redirigir a login
  };

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <Link to="/" className={styles.logo}>Autoparts Store</Link>
        <ul className={styles.navList}>
          <li className={styles.navItem}><Link to="/" className={styles.navLink}>Inicio</Link></li>
          <li className={styles.navItem}><Link to="/products" className={styles.navLink}>Productos</Link></li>
          <li className={styles.navItem}><Link to="/categories" className={styles.navLink}>Categorías</Link></li>
          <li className={styles.navItem}><Link to="/contact" className={styles.navLink}>Contacto</Link></li>

          {user ? (
            <>
              <li className={styles.navItem}>
                <span className={styles.userName}>👤 {user.nombre}</span>
              </li>
              <li className={styles.navItem}>
                <button onClick={handleLogout} className={`${styles.navLink} ${styles.logoutButton}`}>
                  Cerrar sesión
                </button>
              </li>
            </>
          ) : (
            <li className={styles.navItem}>
              <Link to="/login" className={`${styles.navLink} ${styles.loginLink}`}>
                Ingresar
              </Link>
            </li>
          )}

          <li className={styles.navItem}>
            <Link to="/cart" className={`${styles.navLink} ${styles.cartIconLink}`}>
              🛒 Carrito
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
