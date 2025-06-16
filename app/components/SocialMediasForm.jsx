"use client"

import { useState } from "react"
import styles from "../styles/SocialMediasForm.module.css"
import { addSocialNetworks } from "@/serverActions/addSocialNetworks"
import toast from "react-hot-toast"
import { deleteSocialNetwork } from "@/serverActions/deleteSocialNetwork"

export default function SocialMediaForm({ idUsuario, networks, isOtherViewing }) {
    const [socialMedias, setSocialMedias] = useState(networks);
    const [formData, setFormData] = useState({
        redSocial: "",
        link: "",
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleAddSocial = async (e) => {
        e.preventDefault()

        if (formData.redSocial && formData.link) {

            const response = await addSocialNetworks(idUsuario, formData);

            if (response.ok) {
                toast.success(response.message);
                window.location.reload();
                const newSocialMedia = {
                    red_social: formData.redSocial,
                    link: formData.link,
                }

                setSocialMedias((prev) => [...prev, newSocialMedia])
                setFormData({ redSocial: "", link: "" });
            } else {
                toast.error(response.message);
            }
        }
    }

    const handleRemoveSocial = async ({ red_social, link }) => {
        const response = await deleteSocialNetwork(idUsuario, { red_social, link });
        if (response.ok) {
            toast.success("Se elimino la red social");
            setSocialMedias((prev) => prev.filter((social) => social.red_social !== red_social && social.link !== link));
        } else {
            toast.error(response.message);
        }
    }

    return (
        <div className={styles.section}>
            {networks.length > 0 && (
                <>
                    <div className={styles.tableContainer}>
                        <table className={styles.socialTable}>
                            <thead>
                                <tr>
                                    <th className={styles.tableHeader}>Red Social</th>
                                    <th className={styles.tableHeader}>Link</th>

                                    {isOtherViewing ? (null) : (
                                        <th className={styles.tableHeader}>Acciones</th>
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {socialMedias.map(({ red_social, link }, index) => (
                                    <tr key={index} className={styles.tableRow}>
                                        <td className={styles.tableCell}>
                                            <span className={styles.socialName}>{red_social}</span>
                                        </td>
                                        <td className={styles.tableCell}>
                                            <a href={link} target="_blank" rel="noopener noreferrer" className={link}>
                                                {link}
                                            </a>
                                        </td>
                                        {isOtherViewing ? (null) : (
                                            <td className={styles.tableCell}>
                                                <button onClick={() => handleRemoveSocial({ red_social, link })} className={styles.removeButton}>
                                                    Eliminar
                                                </button>
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
            {isOtherViewing ? (null) : (
                <form onSubmit={handleAddSocial} className={styles.gridContainer}>
                    <div className={styles.gridItem}>
                        <p className={styles.label}>Red Social</p>
                        <select
                            name="redSocial"
                            value={formData.redSocial}
                            onChange={handleInputChange}
                            className={styles.inputField}
                            required
                        >
                            <option value="">Selecciona una red social</option>
                            <option value="LinkedIn">LinkedIn</option>
                            <option value="GitHub">GitHub</option>
                            <option value="Twitter">Twitter</option>
                            <option value="Instagram">Instagram</option>
                            <option value="Facebook">Facebook</option>
                            <option value="YouTube">YouTube</option>
                            <option value="TikTok">TikTok</option>
                            <option value="Discord">Discord</option>
                            <option value="Telegram">Telegram</option>
                            <option value="WhatsApp Business">WhatsApp Business</option>
                            <option value="Behance">Behance</option>
                            <option value="Dribbble">Dribbble</option>
                            <option value="Pinterest">Pinterest</option>
                            <option value="Snapchat">Snapchat</option>
                            <option value="Reddit">Reddit</option>
                            <option value="Twitch">Twitch</option>
                            <option value="Medium">Medium</option>
                            <option value="Dev.to">Dev.to</option>
                            <option value="Stack Overflow">Stack Overflow</option>
                            <option value="Spotify">Spotify</option>
                            <option value="SoundCloud">SoundCloud</option>
                            <option value="Clubhouse">Clubhouse</option>
                            <option value="OnlyFans">OnlyFans</option>
                            <option value="Patreon">Patreon</option>
                            <option value="Ko-fi">Ko-fi</option>
                            <option value="Buy Me a Coffee">Buy Me a Coffee</option>
                            <option value="Linktree">Linktree</option>
                            <option value="Portfolio">Portfolio Personal</option>
                            <option value="Sitio Web">Sitio Web</option>
                            <option value="Blog">Blog Personal</option>
                            <option value="Otro">Otro</option>
                        </select>
                    </div>

                    <div className={styles.gridItem}>
                        <p className={styles.label}>Link</p>
                        <input
                            type="url"
                            name="link"
                            value={formData.link}
                            onChange={handleInputChange}
                            className={styles.inputField}
                            placeholder="https://ejemplo.com/tu-perfil"
                            required
                        />
                    </div>

                    <div className={styles.gridItem}>
                        <button type="submit" className={styles.addLinkButton}>
                            + Añadir Social
                        </button>
                    </div>
                </form>
            )}
        </div>
    )
}
