import AplicarVacante from "./PostularModal";

export default async function ({ params }) {
    const { id } = await params;

    return <AplicarVacante vacante={id} />
}