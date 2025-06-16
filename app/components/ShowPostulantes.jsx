import { PostulantesTable } from "./PostulantesTable"

export default function ShowPostulantes({ postulantes }) {
    return (
        <div className="container mx-auto py-8 px-4">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Sistema de Gestión de Postulantes</h1>
                <p className="text-gray-600">Administra y revisa las aplicaciones de los candidatos</p>
            </div>

            <PostulantesTable postulantes={postulantes.postulantes} vacanteId={postulantes.vacante_id} />
        </div>
    )
}
