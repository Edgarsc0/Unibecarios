import styles from "../styles/loading.module.css";

export default function LoadingOverlay({ isActive, message = "Cargando..." }) {
    if (!isActive) return null

    return (
        <div className={styles.overlay}>
            <div className={styles.container}>
                <div className={styles.spinner}></div>
                {message && <p className={styles.message}>{message}</p>}
            </div>
        </div>
    )
}
