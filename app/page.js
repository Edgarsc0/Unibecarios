'use client';

import { useActionState, useEffect, useState } from 'react';
import styles from './bienvenida.module.css';
import { useForm } from 'react-hook-form';
import { login } from '@/serverActions/loginAction';
import toast from 'react-hot-toast';
import LoadingOverlay from './components/Loading';
import useSession from '@/hooks/useSession';

export default function WelcomeModal() {

  const { register } = useForm();

  const { session, loading } = useSession();

  const [isLoading, setIsLoading] = useState(false);

  const [state, formAction] = useActionState(login, { ok: null, message: null });

  useEffect(() => {
    setIsLoading(false);
    if (state.ok) {
      toast.success(state.message);
      state.isAdmin ? window.location.href = `/admin/${state.enterpriseId}` : window.location.href = "/trayectoria"
    } else if (state.message) {
      toast.error(state.message)
    }
  }, [state]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);


  if (loading) return <LoadingOverlay isActive={true} message='Cargando sesión...' />

  if (session) {
    session?.isAdmin ? window.location.href = `/admin/${session.enterpriseId}` : window.location.href = "/trayectoria";
  }


  return (
    <>
      <LoadingOverlay isActive={isLoading} message="Iniciando Sesion..." />
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

            <form action={formAction} className={styles.loginForm}>
              <div className={styles.formGroup}>
                <label className={styles.inputLabel}>Email</label>
                <input
                  type="email"
                  className={styles.inputField}
                  {...register("email")}
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
                  {...register("password")}
                  required
                />
              </div>

              <button type="submit" className={styles.loginButton} onClick={() => setIsLoading(true)}>
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
    </>

  );
}