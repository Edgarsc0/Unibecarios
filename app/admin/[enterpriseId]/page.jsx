import LoadingOverlay from "@/app/components/Loading";
import PanelPrincipal from "@/app/components/PanelPrincipal";
import { getPostulantes } from "@/serverActions/getPostulantes";
import { getVacantes } from "@/serverActions/getVacantes";

export default async function ({ params }) {

    const { enterpriseId } = await params;

    const { ok, vacantes } = await getVacantes(enterpriseId);
    if (ok) {
        const { postulantes } = await getPostulantes(vacantes);

        console.log(postulantes);

        return <PanelPrincipal listaVacantes={vacantes} postulantes={postulantes} />
    } else {
        return <LoadingOverlay isActive={true} message="Error de red." />
    }
}