import styles from './profile.module.css'; 
import Porfile from '../componentes/Profile';

export default function ProfilePage() {
  return (
    <div className={styles.profileContainer}>
      <Porfile />
    </div>
  );
}