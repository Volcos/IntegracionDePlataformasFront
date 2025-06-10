import React from 'react';
import styles from './Home.module.css';
import { Link } from 'react-router-dom';

// Importa las imágenes (rutas relativas correctas)
import heroBgImage from '../../assets/images/hero-bg.jpg';
import wholesaleBgImage from '../../assets/images/wholesale-bg.jpg';
import retailBgImage from '../../assets/images/retail-bg.jpg';

function Home() {
  return (
    <div className={styles.homeContainer}>
      {/* Sección Hero (Banner principal) */}
      <section
        className={styles.heroSection}
        style={{ backgroundImage: `url(${heroBgImage})` }}
      >
        <div className={styles.heroContent}>
          <h1>Encuentra las autopartes que necesitas</h1>
          <p>Amplia selección de repuestos de alta calidad para tu vehículo.</p>
          <button className={styles.callToActionButton}>Explorar Productos</button>
        </div>
      </section>

      {/* NUEVA SECCIÓN: Mayor y Detalle - CONTENEDOR PRINCIPAL */}
      <section className={styles.wholesaleRetailSection}>
        {/* El contenedor que contiene las imágenes */}
        <div className={styles.diagonalSplitContainer}>
          <div
            className={styles.diagonalSectionLeft}
            style={{ backgroundImage: `url(${wholesaleBgImage})` }}
          ></div>
          <div
            className={styles.diagonalSectionRight}
            style={{ backgroundImage: `url(${retailBgImage})` }}
          ></div>
        </div>

        {/* El contenedor con el texto y el botón, que se superpondrá */}
        <div className={styles.wholesaleRetailContentWrapper}>
          <h2 className={styles.wholesaleRetailTitle}>Vendemos productos por mayor y al detalle</h2>
          <button className={styles.registerButton}>Regístrate aquí</button>
        </div>
      </section>
      {/* FIN NUEVA SECCIÓN */}

      {/* Sección Productos Destacados */}
      <section className={styles.featuredProducts}>
        <h2>Productos Destacados</h2>
        <div className={styles.productGrid}>
          <div className={styles.productCard}>
            <h3>Faro Delantero LED</h3>
            <p>Luces brillantes para tu seguridad.</p>
            <button className={styles.addToCartButton}>Ver Detalles</button>
          </div>
          <div className={styles.productCard}>
            <h3>Kit de Frenos Cerámicos</h3>
            <p>Rendimiento y durabilidad superiores.</p>
            <button className={styles.addToCartButton}>Ver Detalles</button>
          </div>
          <div className={styles.productCard}>
            <h3>Filtro de Aire Deportivo</h3>
            <p>Mejora el rendimiento de tu motor.</p>
            <button className={styles.addToCartButton}>Ver Detalles</button>
          </div>
        </div>
      </section>

      {/* Sección Sobre Nosotros */}
      <section className={styles.aboutUsSection}>
        <h2>Sobre Nosotros</h2>
        <p>Somos tu socio confiable en autopartes. Ofrecemos calidad, variedad y el mejor servicio al cliente.</p>
        <button className={styles.learnMoreButton}>Conoce Más</button>
      </section>
    </div>
  );
}

export default Home;