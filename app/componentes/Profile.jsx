"use client"

import { useActionState, useEffect, useState } from 'react';
import styles from '../styles/profile.module.css';
import SocialMediaForm from '../components/SocialMediasForm';
import ClientOnlySelect from '../components/Select';
import { deleteSkill } from '@/serverActions/deleteSkill';
import toast from 'react-hot-toast';
import { addSkills } from '@/serverActions/addSkills';
import { addIdiomas } from '@/serverActions/addIdiomas';
import { deleteIdioma } from '@/serverActions/deleteIdioma';
import { useForm } from 'react-hook-form';
import { submitResidenciaForm } from '@/serverActions/submitResidenciaForm';
import { updateCV } from '@/serverActions/updateUserCV';
import useSession from '@/hooks/useSession';
import LoadingOverlay from '../components/Loading';

export default function Profile({ userInfo, habilidades, idiomas, paises, ciudades, userCV }) {

  const { session, loading } = useSession();
  const [selectedHabilidades, setHabilidades] = useState([]);
  const [selectedIdiomas, setIdiomas] = useState([]);
  const [currentHabilidades, setCurrentHabilidades] = useState(userInfo.habilidades);
  const [currentIdiomas, setCurrentIdiomas] = useState(userInfo.idiomas);
  const [stateResidenciaForm, residenciaAction] = useActionState(submitResidenciaForm, { ok: null, message: null, idUsuario: userInfo.id_usuario });
  const [updateCVState, updateCVAction] = useActionState(updateCV, { ok: null, message: null, idUsuario: userInfo.id_usuario });

  useEffect(() => {
    if (stateResidenciaForm.ok) {
      toast.success(stateResidenciaForm.message);
      window.location.reload();
    } else if (stateResidenciaForm.message) {
      toast.error(stateResidenciaForm.message);
    }
  }, [stateResidenciaForm]);

  useEffect(() => {
    if (updateCVState.ok) {
      toast.success(updateCVState.message);
      window.location.reload();
    } else if (updateCVState.message) {
      toast.error(updateCVState.message);
    }
  }, [updateCVState]);

  const { register } = useForm();

  if (loading) return <LoadingOverlay isActive={true} message='Cargando sesión...' />

  const isOtherViewing = !(session.userId == userInfo.id_usuario);

  const handleMultipleSelectChange = (option) => {
    setHabilidades(option || []);
  }

  const handleAddIdioma = async () => {
    if (selectedIdiomas.length == 0) {
      toast.error("Porfavor agrega idiomas.");
      return;
    }
    for (const { label } of selectedIdiomas) {
      const yaExiste = currentIdiomas.some(h => h.idioma === label);
      if (yaExiste) {
        toast.error(`${label} ya existe.`);
        return;
      }
    }

    const response = await addIdiomas(selectedIdiomas, userInfo.id_usuario);

    if (response.ok) {
      toast.success(response.message);
      const newIdiomas = [];
      selectedIdiomas.map(({ label, value }) => newIdiomas.push({ idioma: label, id_idioma: value }));
      setCurrentIdiomas([...currentIdiomas, ...newIdiomas]);
      setIdiomas([]);
    } else {
      toast.error(response.message);
    }
  }

  const handleAddSkills = async () => {
    if (selectedHabilidades.length == 0) {
      toast.error("Porfavor agrega nuevas habilidades.");
      return;
    }
    for (const { label } of selectedHabilidades) {
      const yaExiste = currentHabilidades.some(h => h.skill === label);
      if (yaExiste) {
        toast.error(`${label} ya existe.`);
        return;
      }
    }

    const response = await addSkills(selectedHabilidades, userInfo.id_usuario);

    if (response.ok) {
      toast.success(response.message);
      const newHabilidades = []
      selectedHabilidades.map(({ label, value }) => newHabilidades.push({ skill: label, id_habilidad: value }));
      setCurrentHabilidades([...currentHabilidades, ...newHabilidades]);
      setHabilidades([]);
    } else {
      toast.error(response.message);
    }
  };

  const handleDeleteIdioma = async (id_idioma) => {
    const response = await deleteIdioma(id_idioma, userInfo.id_usuario);

    if (response.ok) {
      toast.success(response.message);
      const nuevosIdiomas = currentIdiomas.filter(idiomasJSON => idiomasJSON.id_idioma !== id_idioma);
      setCurrentIdiomas(nuevosIdiomas);
    } else if (response.error) {
      toast.error(`Ha ocurrido un error ${response.error}`);
    }
  }

  const handleDeleteSkill = async (id_habilidad) => {
    const response = await deleteSkill(userInfo.id_usuario, id_habilidad);

    if (response.ok) {
      toast.success(response.message);
      const nuevasHabilidades = currentHabilidades.filter(skillJSON => skillJSON.id_habilidad !== id_habilidad);
      setCurrentHabilidades(nuevasHabilidades);
    } else if (response.error) {
      toast.error(`Ha ocurrido un error: ${response.error}`);
    }
  }

  const handleIdiomasChange = option => {
    setIdiomas(option || []);
  }

  return (
    <div className={styles.profileContainer}>
      <h1 className={styles.title}>Mi Perfil Profesional</h1>

      <div className={styles.profileHeader}>
        <h2 className={styles.name}>{userInfo.nombre}</h2>
        <p className={styles.email}>{userInfo.email}</p>
      </div>

      <form className={styles.section} action={residenciaAction}>
        <h3 className={styles.sectionTitle}>Residencia</h3>
        <div className={styles.gridContainer}>
          <div className={styles.gridItem}>
            <p className={styles.label}>Número celular</p>
            <p className={styles.value}>
              {isOtherViewing ? (userInfo.telefono) : (
                <>
                  {!userInfo.telefono ? (
                    <input
                      required
                      {...register("telefono")}
                      className={styles.inputField} placeholder='Agrega un numero celular.' />
                  ) : (userInfo.telefono)}
                </>
              )}
            </p>
          </div>
          <div className={styles.gridItem}>
            <p className={styles.label}>Ciudad</p>
            <p className={styles.value}>
              {isOtherViewing ? (userInfo.ciudad) : (
                <>
                  {!userInfo.ciudad ? (
                    <select
                      required
                      {...register("Ciudad")}
                      className={styles.inputField} placeholder='Agrega una ciudad.' >
                      {ciudades.map(({ id_ciudad, nombre }) => (
                        <option key={id_ciudad} value={id_ciudad}>{nombre}</option>
                      ))}
                    </select>
                  ) : (userInfo.ciudad)}
                </>
              )}
            </p>
          </div>
          <div className={styles.gridItem}>
            <p className={styles.label}>Género</p>
            <p className={styles.value}>
              {isOtherViewing ? (userInfo.genero) : (
                <>
                  {!userInfo.genero ? (
                    <select
                      {...register("genero")}
                      className={styles.inputField} placeholder='Agrega un genero' >
                      <option value="hombre">Hombre</option>
                      <option value="mujer">Mujer</option>
                    </select>
                  ) : userInfo.genero}
                </>
              )}
            </p>
          </div>
          <div className={styles.gridItem}>
            <p className={styles.label}>País</p>
            <p className={styles.value}>
              {isOtherViewing ? (null) : (
                <>
                  {!userInfo.pais ? (
                    <select
                      {...register("pais")}
                      className={styles.inputField} placeholder='De que pais eres'>
                      {paises?.map((pais) => (
                        <option key={pais.id_pais} value={pais.id_pais}>{pais.nombre}</option>
                      ))}
                    </select>
                  ) : (userInfo.pais)}
                </>
              )}
            </p>
          </div>
          <div className={styles.gridItem}>
            <p className={styles.label}>Escuela de Procedencia</p>
            <p className={styles.value}>
              {isOtherViewing ? (userInfo.universidad) : (
                <>
                  {!userInfo.universidad ? ("No hay una universidad registrada.") : (userInfo.universidad)}
                </>
              )}
            </p>
          </div>
          <div className={styles.gridItem}>
            <p className={styles.label}>Carrera</p>
            <p className={styles.value}>
              {isOtherViewing ? (userInfo.carrera) : (
                <>
                  {!userInfo.carrera ? ("No hay una carrera registrada.") : (userInfo.carrera)}
                </>
              )}
            </p>
          </div>
          {isOtherViewing ? (null) : (
            <>
              {userInfo.telefono && userInfo.genero && userInfo.ciudad && userInfo.pais ? null : (
                <button type='submit' className={styles.addLinkButton}>
                  Guardar cambios
                </button>
              )}
            </>
          )}
        </div>
      </form>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>My Links</h3>
        <div className={styles.linksContainer}>
          <SocialMediaForm isOtherViewing={isOtherViewing} idUsuario={userInfo.id_usuario} networks={userInfo.redes_sociales} />
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Habilidades</h3>
        <div className={styles.skillsContainer}>
          {currentHabilidades.map(({ skill, id_habilidad }, index) => (
            <span key={index} className={styles.skill}>
              {skill}
              {isOtherViewing ? (null) : (
                <button
                  className={styles["remove-btn"]}
                  aria-label={`Eliminar ${skill}`}
                  onClick={() => handleDeleteSkill(id_habilidad)}
                >
                  ×
                </button>
              )}
            </span>
          ))}
        </div>
        {isOtherViewing ? (null) : (
          <div className={styles.addHabilidadesContainer}>
            <ClientOnlySelect
              value={selectedHabilidades}
              onChange={(option) => {
                handleMultipleSelectChange(option);
              }}
              isMulti={true}
              options={habilidades}
              placeholder="Selecciona las habilidades que domines"
            />
            <button onClick={handleAddSkills} className={styles.addLinkButton}>
              + Añadir habilidades
            </button>
          </div>
        )}
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Idiomas</h3>
        <div className={styles.languagesContainer}>
          {currentIdiomas.map(({ idioma, id_idioma }, index) => (
            <span key={index} className={styles.skill}>
              {idioma}
              {isOtherViewing ? (null) : (
                <button
                  className={styles["remove-btn"]}
                  aria-label={`Eliminar ${idioma}`}
                  onClick={() => handleDeleteIdioma(id_idioma)}
                >
                  ×
                </button>
              )}
            </span>
          ))}
        </div>
        {isOtherViewing ? (null) : (
          <div className={styles.addHabilidadesContainer}>
            <ClientOnlySelect
              value={selectedIdiomas}
              onChange={(option) => {
                handleIdiomasChange(option);
              }}
              isMulti={true}
              options={idiomas}
              placeholder="Selecciona los idiomas que domines"
            />
            <button onClick={handleAddIdioma} className={styles.addLinkButton}>
              + Añadir idiomas
            </button>
          </div>
        )}
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Curriculum</h3>
        <div className={styles.languagesContainer}>
          {isOtherViewing ? (null) : (
            <div className={styles.formGroup}>
              <label className={styles.label}>{userCV ? ("Actualizar CV") : "Sube tu CV"}{" max 5MB"}</label>
              <form action={updateCVAction} className={styles.fileUpload}>
                <input
                  type="file"
                  accept=".pdf"
                  {...register("cv")}
                  required
                />
                <div className={styles.uploadText}>
                  {userCV ? ("Actualizar CV") : "Sube tu CV"}
                </div>
                <button type='submit' className={styles.addLinkButton}>
                  {userCV ? ("Actualizar CV") : "Sube tu CV"}
                </button>
              </form>
            </div>
          )}
          {userCV ? (
            <iframe
              src={userCV}
              width="100%"
              height="600px"
              style={{ border: "none" }}
              title='CURRICULUM'
            />
          ) : (null)}
        </div>
      </div>
    </div>
  );
}

