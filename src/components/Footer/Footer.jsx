import React from 'react';
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <p>&copy; {new Date().getFullYear()} Autoparts Store. Todos los derechos reservados.</p>
        <div className={styles.socialLinks}>
          <a href="#" className={styles.socialIcon}>Facebook</a>
          <a href="#" className={styles.socialIcon}>Instagram</a>
          <a href="#" className={styles.socialIcon}>Twitter</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;