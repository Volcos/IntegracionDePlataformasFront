// autoparts/client/src/pages/Register/RegisterPage.jsx
import React, { useState } from 'react'; // Necesitamos useState para manejar la selección de tipo de usuario
import { Link } from 'react-router-dom';
import styles from './RegisterPage.module.css'; // Estilos específicos de la página de Registro
import axios from 'axios';
import { configDotenv } from 'dotenv';




function RegisterPage() {
  const [userType, setUserType] = useState(0); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    
    const data = {
      nombre: formData.get('name'),
      rut: formData.get('rut'),
      telefono: formData.get('phone'),
      email: formData.get('email'),
      direccion: formData.get('address'),
      contrasena: formData.get('password'),
      id_tipo_cliente: userType === setUserType(0 ? 1 : 3), 
    };
    console.log(userType);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/crearUsuario`, data);
      console.log('Respuesta del servidor:', response.data);
      alert('¡Usuario registrado exitosamente!');
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      alert('Ocurrió un error al registrar el usuario.');
    }
  };

  return (
    <div className={styles.registerContainer}>
      <div className={styles.registerCard}>
        <h1 className={styles.registerTitle}>Crear Nueva Cuenta</h1>
        <form className={styles.registerForm} onSubmit={handleSubmit}>
          {/* Campo Nombre */}
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.formLabel}>Nombre Completo</label>
            <input
              type="text"
              id="name"
              name="name"
              className={styles.formInput}
              placeholder="Ej: Juan Pérez"
              required
            />
          </div>

          {/* Campo RUT */}
          <div className={styles.formGroup}>
            <label htmlFor="rut" className={styles.formLabel}>RUT</label>
            <input
              type="text"
              id="rut"
              name="rut"
              className={styles.formInput}
              placeholder="Ej: 12.345.678-9"
              required
            />
          </div>

          {/* Campo Teléfono */}
          <div className={styles.formGroup}>
            <label htmlFor="phone" className={styles.formLabel}>Teléfono</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className={styles.formInput}
              placeholder="Ej: +56912345678"
              required
            />
          </div>

          {/* Campo Correo Electrónico */}
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

          {/* Campo Dirección */}
          <div className={styles.formGroup}>
            <label htmlFor="address" className={styles.formLabel}>Dirección</label>
            <input
              type="text"
              id="address"
              name="address"
              className={styles.formInput}
              placeholder="Ej: Av. Principal 123, Depto 404"
              required
            />
          </div>

          {/* Opción "Soy una persona" / "Soy una empresa" */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Tipo de Usuario</label>
            <div className={styles.userTypeSelector}>
              <button
                type="button" // Importante: para que no envíe el formulario
                className={`${styles.userTypeButton} ${userType === 1 ? styles.active : ''}`}
                onClick={() => setUserType(1)}
              >
                Soy una persona
              </button>
              <button
                type="button" // Importante: para que no envíe el formulario
                className={`${styles.userTypeButton} ${userType === 3 ? styles.active : ''}`}
                onClick={() => setUserType(3)}
              >
                Soy una empresa
              </button>
            </div>
          </div>

          {/* Campo Contraseña (puedes añadirlo si lo necesitas para el registro) */}
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

          {/* Campo Confirmar Contraseña (recomendado) handleSubmit */}
          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword" className={styles.formLabel}>Confirmar Contraseña</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className={styles.formInput}
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" className={styles.submitButton}>Registrarme</button>
        </form>

        <p className={styles.loginText}>
          Ya tienes cuenta? {' '}
          <Link to="/login" className={styles.loginLink}>
            Ingresar aquí
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;