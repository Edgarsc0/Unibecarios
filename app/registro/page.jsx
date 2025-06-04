'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import styles from './registro.module.css';
import Link from 'next/link';

export default function UserRegistrationModal() {
  const router = useRouter();

  const handleRegister = (e) => {
    e.preventDefault();
    // Lógica de registro aquí
    router.push('/perfil'); // Redirige después del registro
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
        <div className={styles.header}>
          <h1 className={styles.mainTitle}>Registrarte como usuario</h1>
          <h2 className={styles.subtitle}>Crea tu perfil de estudiante</h2>
          <p className={styles.description}>Completa tu registro en menos de 5 minutos</p>
        </div>

        <div className={styles.scrollableContent}>
          <form onSubmit={handleRegister} className={styles.registrationForm}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Nombre completo*</label>
                <input
                  type="text"
                  className={styles.inputField}
                  placeholder="Ej. Juan Pérez"
                  required
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Correo electrónico*</label>
                <input
                  type="email"
                  className={styles.inputField}
                  placeholder="ejemplo@correo.com"
                  required
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Contraseña*</label>
                <input
                  type="password"
                  className={styles.inputField}
                  placeholder="········"
                  required
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Confirmar contraseña*</label>
                <input
                  type="password"
                  className={styles.inputField}
                  placeholder="········"
                  required
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Universidad*</label>
                <input
                  type="text"
                  className={styles.inputField}
                  placeholder="Ej. UNAM, IPN, etc."
                  required
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Carrera*</label>
                <input
                  type="text"
                  className={styles.inputField}
                  placeholder="Ej. Ingeniería en Computación"
                  required
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Sube tu CV (PDF)*</label>
                <div className={styles.fileUpload}>
                  <input
                    type="file"
                    accept=".pdf"
                    className={styles.fileInput}
                    required
                  />
                  <div className={styles.uploadText}>
                    Haz clic para subir o arrastra tu CV (máx. 5MB)
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Habilidades clave*</label>
                <input
                  type="text"
                  className={styles.inputField}
                  placeholder="Ej. JavaScript, Diseño UI, Marketing Digital..."
                  required
                />
              </div>
            </div>

            <div className={styles.buttonGroup}>
              <button
                type="button"
                className={styles.cancelButton}
                onClick={() => router.back()}
              >
                Cancelar
              </button>
              <button type="submit" className={styles.submitButton}>
                Confirmar Registro
              </button>
            </div>
          </form>
        </div>
        <div className={styles.footer}>
          <p className={styles.registerText}>
            ¿No tienes cuenta?{' '}
            <Link href="/registrarEmpresa" className={styles.registerLink}>
              Regístrate como empresa
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}