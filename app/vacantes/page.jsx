import { getAllVacantes } from "@/serverActions/getAllVacantes";
import VacantesPage from "./VacantesModal";

export default async function () {

    const { vacantes } = await getAllVacantes();

    console.log(vacantes);

    return <VacantesPage vacantes={vacantes} />
}