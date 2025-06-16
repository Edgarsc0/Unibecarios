import { getAllVacantes } from "@/serverActions/getAllVacantes";
import VacantesPage from "./VacantesModal";

export const dynamic = "force-dynamic"; // <-- esto fuerza que se ejecute en cada request

export default async function VacantesServerComponent() {
    const { vacantes } = await getAllVacantes();
    return <VacantesPage vacantes={vacantes} />;
}
