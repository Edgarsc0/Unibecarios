import { getAllVacantes } from "@/serverActions/getAllVacantes";
import VacantesPage from "./VacantesModal";

export default async function () {

    const { vacantes } = await getAllVacantes();

    return <VacantesPage vacantes={vacantes} />
}