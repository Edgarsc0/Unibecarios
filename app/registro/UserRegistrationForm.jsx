"use client"

import { useRouter } from 'next/navigation';
import { useActionState, useEffect, useState } from 'react';
import styles from "../styles/registro.module.css";
import Link from 'next/link';
import ClientOnlySelect from '../components/Select';
import { useForm, Controller } from 'react-hook-form';
import toast from 'react-hot-toast';
import { submitRegisterForm } from '@/serverActions/submitRegisterForm';
import { startTransition } from 'react';
import LoadingOverlay from '../components/Loading';

function agruparPorCategoria(habilidades) {
    const grupos = {};

    for (const h of habilidades) {
        if (!grupos[h.categoria]) {
            grupos[h.categoria] = [];
        }
        grupos[h.categoria].push({
            value: h.id_habilidad,
            label: h.nombre,
        });
    }

    return Object.entries(grupos).map(([categoria, opciones]) => ({
        label: categoria,
        options: opciones,
    }));
}


export default function UserRegistrationModal({ universidades, habilidades, carreras, message }) {

    const [isLoading, setIsLoading] = useState(false);

    if (message) {
        return <LoadingOverlay isActive={isLoading} message={message} />
    }

    const router = useRouter();

    const [state, formAction] = useActionState(submitRegisterForm, { ok: null, message: null });

    const [selectedOption, setSelectedOption] = useState(null);

    const [optionsCarrera, setOptionsCarrera] = useState(null);

    const [carrera, setCarrera] = useState(null);

    const [selectedHabilidades, setHabilidades] = useState([]);

    const { register, handleSubmit, control } = useForm();

    useEffect(() => {
        setIsLoading(false);
        if (state.ok) {
            toast.success(state.message);
            window.location.href = "/";
        } else if (state.message) {
            toast.error(state.message);
        }
    }, [state]);

    const handleRegister = ({ carrera, cv, email, habilidades, name, password1, password2, universidad }) => {

        if (!(password1 === password2)) {
            toast.error("Las contraseñas no coinciden. Porfavor comprueba los campos.");
        } else {
            const formData = new FormData();

            formData.append("nombre", name);
            formData.append("email", email);
            formData.append("password", password1);

            if (cv && cv[0]) {
                formData.append("cv", cv[0]);
            }

            formData.append("universidad", JSON.stringify(universidad));
            formData.append("carrera", JSON.stringify(carrera));
            formData.append("habilidades", JSON.stringify(habilidades));

            startTransition(() => {
                formAction(formData);
            });

            setIsLoading(true);

        }
    };

    const options = universidades.map(({ id_universidad, nombre }) => ({
        value: id_universidad,
        label: nombre,
    }));

    const optionsCarreraFormateado = carreras.map(({ id_carrera, nombre, id_universidad }) => ({
        value: id_carrera,
        label: nombre,
        id_universidad,
    }));

    const groupedHabilidades = agruparPorCategoria(habilidades);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    const handleSelectedChange = (option) => {
        setCarrera(null);
        setSelectedOption(option);
        setOptionsCarrera(
            optionsCarreraFormateado.filter((carrera) => carrera.id_universidad === option.value)
        );
    }

    const handleMultipleSelectChange = (option) => {
        setHabilidades(option || []);
    }

    const handleCarreraChange = (option) => {
        setCarrera(option);
    }

    return (
        <>
            <LoadingOverlay isActive={isLoading} message="Registrando usuario" />
            <div className={styles.modalOverlay}>
                <div className={styles.modalContainer}>
                    <div className={styles.header}>
                        <h1 className={styles.mainTitle}>Registrarte como usuario</h1>
                        <h2 className={styles.subtitle}>Crea tu perfil de estudiante</h2>
                        <p className={styles.description}>Completa tu registro en menos de 5 minutos</p>
                    </div>

                    <div className={styles.scrollableContent}>
                        <form onSubmit={handleSubmit(handleRegister)} className={styles.registrationForm} encType='multipart/form-data'>
                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Nombre completo*</label>
                                    <input
                                        type="text"
                                        className={styles.inputField}
                                        placeholder="Ej. Juan Pérez"
                                        {...register("name")}
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
                                        {...register("email")}
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
                                        {...register("password1")}
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
                                        {...register("password2")}
                                        required
                                    />
                                </div>
                            </div>

                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Universidad*</label>
                                    <Controller
                                        name="universidad"
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                            <>
                                                {options && (
                                                    <ClientOnlySelect
                                                        value={selectedOption}
                                                        onChange={(option) => {
                                                            handleSelectedChange(option);
                                                            field.onChange(option);
                                                        }}
                                                        options={options}
                                                        placeholder="Selecciona una universidad"
                                                    />)}
                                            </>
                                        )}
                                    />

                                </div>
                            </div>

                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Carrera*</label>
                                    <Controller
                                        name="carrera"
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                            <>
                                                {optionsCarrera ? (
                                                    <ClientOnlySelect
                                                        value={carrera}
                                                        onChange={(option) => {
                                                            handleCarreraChange(option);
                                                            field.onChange(option);
                                                        }}
                                                        options={optionsCarrera}
                                                        placeholder="Selecciona una carrera"
                                                    />) : (
                                                    <label className={`${styles.label} ${styles.inputField}`}>Escoge una universidad</label>
                                                )}
                                            </>
                                        )}
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
                                            {...register("cv")}
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
                                    <Controller
                                        name="habilidades"
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                            <ClientOnlySelect
                                                value={selectedHabilidades}
                                                onChange={(option) => {
                                                    handleMultipleSelectChange(option);
                                                    field.onChange(option);
                                                }}
                                                isMulti={true}
                                                options={groupedHabilidades}
                                                placeholder="Selecciona las habilidades que domines"
                                            />)
                                        }
                                    />
                                </div>
                            </div>

                            <div className={styles.buttonGroup}>
                                <button
                                    type="button"
                                    className={styles.cancelButton}
                                    onClick={() => router.push("/")}
                                >
                                    Cancelar
                                </button>
                                <button type="submit" className={styles.submitButton}>
                                    Confirmar Registro
                                </button>
                            </div>
                        </form>
                    </div>
                </div >
            </div >
        </>
    );
}
