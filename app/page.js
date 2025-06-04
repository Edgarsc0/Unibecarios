'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import styles from './bienvenida.module.css';

export default function WelcomeModal() {
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    // Lógica de autenticación aquí
    localStorage.setItem('isAuthenticated', 'true');
    router.push('/trayectoria');
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        {/* Contenido superior */}
        <div className={styles.welcomeContent}>
          <h1 className={styles.mainTitle}>BIENVENIDO</h1>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>¿Qué enfrentamos?</h2>
            <p className={styles.sectionText}>
              El desafío de conectar a estudiantes universitarios y recién egresados con oportunidades laborales acordes a sus competencias y trayectoria académica.
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>¿Qué ofrecemos?</h2>
            <p className={styles.sectionText}>
              Un sistema informático que simplifica la búsqueda y acceso a ofertas laborales relevantes; facilitamos tu camino hacia una carrera exitosa.
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>¡Anímate!</h2>
            <p className={styles.sectionText}>
              Únete a nosotros y descubre cómo transformar tu educación en oportunidades concretas.
            </p>
          </div>
        </div>

        {/* Sección de login */}
        <div className={styles.loginSection}>
          <div className={styles.loginHeader}>
            <h2 className={styles.loginTitle}>UNIBECARIOS</h2>
          </div>

          <form onSubmit={handleLogin} className={styles.loginForm}>
            <div className={styles.formGroup}>
              <label className={styles.inputLabel}>Email</label>
              <input
                type="email"
                className={styles.inputField}
                placeholder="example@example.com"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.inputLabel}>Password</label>
              <input
                type="password"
                className={styles.inputField}
                placeholder="........"
                required
              />
            </div>

            <button type="submit" className={styles.loginButton}>
              INICIAR SESIÓN
            </button>

            <div className={styles.divider}></div>

            <p className={styles.registerText}>
              ¿No tienes cuenta?{' '}
              <a href="\registro" className={styles.registerLink}>Regístrate</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}