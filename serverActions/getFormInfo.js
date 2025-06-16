import { getUniversidades } from '@/serverActions/getUniversidades';
import { getCarreras } from '@/serverActions/getCarreras';
import { getHabilidades } from '@/serverActions/getHabilidades';

export async function getFormInfo() {
    try {
        const [universidades, carreras, habilidades] = await Promise.all([
            getUniversidades(),
            getCarreras(),
            getHabilidades()
        ]);

        const errores = [];

        if (!universidades.ok) errores.push(`universidades: ${universidades.error}`);
        if (!carreras.ok) errores.push(`carreras: ${carreras.error}`);
        if (!habilidades.ok) errores.push(`habilidades: ${habilidades.error}`);

        if (errores.length > 0) {
            return {
                ok: false,
                message: `Hubo errores al obtener los datos: ${errores.join(' | ')}`
            };
        }

        return {
            ok: true,
            universidades: universidades.response,
            carreras: carreras.response,
            habilidades: habilidades.response
        };
    } catch (error) {
        return {
            ok: false,
            message: `Error inesperado: ${error.message}`
        };
    }
}
