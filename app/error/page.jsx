import LoadingOverlay from "../components/Loading";

export default function errorPage() {
    return <LoadingOverlay isActive={true} message="Error de red. Al parecer tu red no permite conectarse a nuestra base de datos. Por favor conectate a otra red."></LoadingOverlay>
}