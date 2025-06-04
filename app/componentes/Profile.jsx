import styles from '../perfil/profile.module.css';

// Mock data - replace with actual database query
const profileData = {
  name: "Luis Fernando Aguilar Martinez",
  email: "luis.aguilar.dev@gmail.com",
  phone: "(+52) 55 1234 5678",
  location: "Ciudad de México, México",
  gender: "Hombre",
  nationality: "México",
  school: "Escuela superior de cómputo",
  degree: "Sistemas Computacionales",
  skills: ["Java", "CSS"],
  languages: ["Español", "Inglés"],
  links: {
    linkedin: "linkedin.com/in/luisfaguilar",
    github: "github.com/fraguilar"
  }
};

export default function Profile() {
  return (
    <div className={styles.profileContainer}>
      <h1 className={styles.title}>Mi Perfil Profesional</h1>

      <div className={styles.profileHeader}>
        <h2 className={styles.name}>{profileData.name}</h2>
        <p className={styles.email}>{profileData.email}</p>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Residencia</h3>
        <div className={styles.gridContainer}>
          <div className={styles.gridItem}>
            <p className={styles.label}>Número celular</p>
            <p className={styles.value}>{profileData.phone}</p>
          </div>
          <div className={styles.gridItem}>
            <p className={styles.label}>Ciudad</p>
            <p className={styles.value}>{profileData.location}</p>
          </div>
          <div className={styles.gridItem}>
            <p className={styles.label}>Género</p>
            <p className={styles.value}>{profileData.gender}</p>
          </div>
          <div className={styles.gridItem}>
            <p className={styles.label}>País</p>
            <p className={styles.value}>{profileData.nationality}</p>
          </div>
          <div className={styles.gridItem}>
            <p className={styles.label}>Escuela de Procedencia</p>
            <p className={styles.value}>{profileData.school}</p>
          </div>
          <div className={styles.gridItem}>
            <p className={styles.label}>Carrera</p>
            <p className={styles.value}>{profileData.degree}</p>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>My Links</h3>
        <div className={styles.linksContainer}>
          <a href={`https://${profileData.links.linkedin}`} className={styles.link}>
            LinkedIn: {profileData.links.linkedin}
          </a>
          <span className={styles.linkTime}>1 month ago</span>
          <a href={`https://${profileData.links.github}`} className={styles.link}>
            GitHub: {profileData.links.github}
          </a>
          <span className={styles.linkTime}>2 months ago</span>
          <button className={styles.addLinkButton}>+ Add new link</button>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Habilidades</h3>
        <div className={styles.skillsContainer}>
          {profileData.skills.map((skill, index) => (
            <span key={index} className={styles.skill}>{skill}</span>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Idiomas</h3>
        <div className={styles.languagesContainer}>
          {profileData.languages.map((language, index) => (
            <span key={index} className={styles.language}>{language}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

