import CategoriaAccordion from '../componentes/CategoriaAccordion';

export default function HomePage() {

  const categorias = [
    {
      area: "Ciencias Físico-Matemáticas e Ingenierías",
      opciones: [
        { texto: "Ingeniería Civil y Construcción", valor: "ICC", id: "ICC" },
        { texto: "Ingeniería Eléctrica y Electrónica", valor: "IEE", id: "IEE" },
        { texto: "Ingeniería Mecánica y afines", valor: "IMA", id: "IMA" },
        { texto: "Ingeniería Química y de Alimentos", valor: "IQA", id: "IQA" },
        { texto: "Ingeniería Ambiental y Energía", valor: "IAE", id: "IAE" },
        { texto: "Computación, TIC y Software", valor: "CTS", id: "CTS" },
        { texto: "Matemáticas y Física", valor: "MF", id: "MF" }
      ]
    },
    {
      area: "Ciencias Biológicas, Químicas y de la Salud",
      opciones: [
        { texto: "Ciencias de la Salud", valor: "SALUD", id: "SALUD" },
        { texto: "Psicología", valor: "PSICO", id: "PSICO" },
        { texto: "Ciencias Biológicas", valor: "BIO", id: "BIO" },
        { texto: "Ciencias Químicas", valor: "QUIM", id: "QUIM" },
        { texto: "Ciencias Ambientales", valor: "AMBI", id: "AMBI" }
      ]
    },
    {
      area: "Ciencias Sociales y Administrativas",
      opciones: [
        { texto: "Administración y Negocios", valor: "NEGOCIOS", id: "NEGOCIOS" },
        { texto: "Ciencias Políticas y Jurídicas", valor: "JUR", id: "JUR" },
        { texto: "Ciencias Sociales y Humanas", valor: "SOCIAL", id: "SOCIAL" },
        { texto: "Economía y Desarrollo", valor: "ECON", id: "ECON" },
        { texto: "Turismo y Gestión Cultural", valor: "TURISMO", id: "TURISMO" }
      ]
    },
    {
      area: "Humanidades y Artes",
      opciones: [
        { texto: "Filosofía y Letras", valor: "LET", id: "LET" },
        { texto: "Historia y Humanidades", valor: "HIST", id: "HIST" },
        { texto: "Comunicación y Medios", valor: "COM", id: "COM" },
        { texto: "Diseño y Artes Visuales", valor: "DISENO", id: "DISENO" },
        { texto: "Educación y Pedagogía", valor: "EDU", id: "EDU" }
      ]
    },
    {
      area: "Educación y Formación Docente",
      opciones: [
        { texto: "Educación Básica", valor: "BASICA", id: "BASICA" },
        { texto: "Educación Especializada", valor: "ESPEC", id: "ESPEC" },
        { texto: "Gestión e Intervención Educativa", valor: "GESTION", id: "GESTION" }
      ]
    },
    {
      area: "Urbanismo y Desarrollo Metropolitano",
      opciones: [
        { texto: "Urbanismo y Planeación", valor: "URBAN", id: "URBAN" },
        { texto: "Gestión del Territorio", valor: "GESTTERR", id: "GESTTERR" }
      ]
    }
  ];


  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold">TRAYECTORIA ACADEMICA</h1>

      <p>
        <strong>¿No tienes claro a qué te puedes dedicar con lo que estás estudiando?</strong>
      </p>

      <p>
        En <strong>UNIBECARIOS</strong> te ayudamos a descubrirlo. Explora las áreas académicas que
        existen en la CDMX y conoce qué caminos puedes seguir según tu carrera. Ya sea que estés
        empezando o a punto de terminar la uni, aquí puedes ver tus opciones de especialización y
        las áreas en las que podrías desarrollarte profesionalmente.
      </p>

      <p>
        <strong>Conoce tus opciones. Decide tu futuro.</strong>
      </p>

      <section className="space-y-2 text-black">
        {categorias.map((cat) => (
          <CategoriaAccordion
            key={cat.area}
            titulo={cat.area}
            opciones={cat.opciones}
          />
        ))}
      </section>

    </section>
  );
}
