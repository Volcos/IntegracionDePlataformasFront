import React from 'react';
import { Link } from 'react-router-dom'; // Importa Link para la navegación interna
import styles from './Header.module.css';

function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <Link to="/" className={styles.logo}>Autoparts Store</Link> {/* Usamos Link */}
        <ul className={styles.navList}>
          <li className={styles.navItem}><Link to="/" className={styles.navLink}>Inicio</Link></li> {/* Usamos Link */}
          <li className={styles.navItem}><Link to="/products" className={styles.navLink}>Productos</Link></li>
          <li className={styles.navItem}><Link to="/categories" className={styles.navLink}>Categorías</Link></li>
          <li className={styles.navItem}><Link to="/contact" className={styles.navLink}>Contacto</Link></li>
          {/* El botón "Ingresar" */}
          <li className={styles.navItem}>
            <Link to="/login" className={`${styles.navLink} ${styles.loginLink}`}>
              Ingresar {/* Texto cambiado */}
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/cart" className={`${styles.navLink} ${styles.cartIconLink}`}>
              🛒 Carrito {/* Puedes usar un icono de carrito real si instalas una librería de iconos */}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;