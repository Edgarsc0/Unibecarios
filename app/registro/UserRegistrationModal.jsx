import LoadingOverlay from '../components/Loading';
import UserRegistrationForm from './UserRegistrationForm';
import { getFormInfo } from '@/serverActions/getFormInfo';

export default async function UserRegistrationModal() {
    const result = await getFormInfo();

    if (result.ok) {
        const { universidades, habilidades, carreras } = result;

        return (
            <UserRegistrationForm
                universidades={universidades}
                habilidades={habilidades}
                carreras={carreras}
            />
        );
    } else {
        return (
            <LoadingOverlay isActive={true} message={`Error de red. Prueba recargando la pagina o cambiando de red.`} />
        );
    }
}
