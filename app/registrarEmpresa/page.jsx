'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import styles from './registrarEmpresa.module.css';

export default function CompanyRegistrationModal() {
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica de registro aquí
    router.push('/perfil'); // Redirigir después del registro
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
        <h1 className={styles.mainTitle}>Registrarte como empresa</h1>
        <h2 className={styles.subtitle}>Registra tu compañía</h2>
        <p className={styles.description}>Create your company profile for free in less than 5 minutes.</p>

        <form onSubmit={handleSubmit} className={styles.registrationForm}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Nombre de la compañía*</label>
            <input
              type="text"
              className={styles.inputField}
              placeholder="e.g. Linear"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Sitio web*</label>
            <input
              type="url"
              className={styles.inputField}
              placeholder="www.example.com"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Imagen de perfil*</label>
            <div className={styles.fileUpload}>
              <input
                type="file"
                accept="image/svg+xml,image/png,image/jpeg,image/gif"
                className={styles.fileInput}
                required
              />
              <div className={styles.uploadText}>
                Click to upload or drag and drop SVG, PNG, JPG or GIF (max. 800x400px)
              </div>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Correo electrónico*</label>
            <input
              type="email"
              className={styles.inputField}
              placeholder="contacto@empresa.com"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Palabras clave*</label>
            <input
              type="text"
              className={styles.inputField}
              placeholder="B2B, SaaS, marketplace, design..."
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Descripción*</label>
            <textarea
              className={`${styles.inputField} ${styles.textarea}`}
              placeholder="Cuéntanos más sobre la compañía"
              required
              rows={4}
            />
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
              Confirmar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}