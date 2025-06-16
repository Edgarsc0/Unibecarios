import LoadingOverlay from "@/app/components/Loading";
import VacanteDetail from "./VacanteIdModal";
import { getVacanteInfo } from "@/serverActions/getVacanteInfo";


export default async function ({ params }) {
    const { id } = await params;

    const vacanteInfo = await getVacanteInfo(id);

    if (vacanteInfo.vacante) {
        return <VacanteDetail vacanteInfo={vacanteInfo.vacante} />
    } else {
        return <LoadingOverlay isActive={true} message="404 No encontrado" />
    }
}