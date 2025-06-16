import { getUserInfo } from "@/serverActions/getUserInfo";
import Profile from "../componentes/Profile";
import { getHabilidades } from "@/serverActions/getHabilidades";
import { getIdiomas } from "@/serverActions/getIdiomas";
import { getPaises } from "@/serverActions/getPaises";
import { getCiudades } from "@/serverActions/getCiudades";
import { getUserCV } from "@/serverActions/getUserCV";
import LoadingOverlay from "../components/Loading";

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

export default async function ProfileModal({ user }) {
    const resultUser = await getUserInfo(user);
    const resultHabilidades = agruparPorCategoria((await getHabilidades()).response);
    const idiomas = (await getIdiomas()).response;
    const paises = await getPaises();
    const ciudades = await getCiudades()
    const userCV = await getUserCV(user);

    const idiomasFormateado = idiomas?.map(({ id_idioma, nombre }) => ({
        value: id_idioma,
        label: nombre
    }));

    if (resultUser.userInfo.getuserinfo !== 'No existe información para el usuario solicitado.') {
        return <Profile userInfo={JSON.parse(resultUser.userInfo.getuserinfo)} habilidades={resultHabilidades} idiomas={idiomasFormateado} paises={paises.response} ciudades={ciudades.response} userCV={(userCV.cv ? (userCV.cv) : null)} />
    } else {
        return <LoadingOverlay isActive={true} message="404 no encontrado." />
    }
}