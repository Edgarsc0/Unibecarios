const querys = {
    getUniversidades: "SELECT * FROM universidad",
    getCarreras: "SELECT * FROM carrera",
    getHabilidades: "SELECT * FROM habilidades",
    callProcedureUsuarioHabilidades: "CALL crear_usuario_con_habilidades($1, $2, $3, $4, $5, $6, $7);",
    getUser: "SELECT * FROM usuarios WHERE email = $1",
    callGetUserFunction: "SELECT getUserInfo($1)",
    getIdiomas: "SELECT * FROM idiomas",
    deleteSkill: "DELETE FROM usuario_habilidades WHERE id_usuario = $1 AND id_habilidad = $2",
    addSkills: "INSERT INTO usuario_habilidades (id_usuario, id_habilidad) VALUES",
    addIdiomas: "INSERT INTO usuario_idiomas (id_usuario, id_idioma) VALUES",
    deleteIdioma: "DELETE FROM usuario_idiomas WHERE id_usuario = $1 AND id_idioma = $2",
    addSocialNetWorks: "INSERT INTO usuario_redes_sociales (id_usuario,red_social,link_red_social) VALUES ($1,$2,$3)",
    deleteSocialNetwork: "DELETE FROM usuario_redes_sociales WHERE id_usuario = $1 AND red_social = $2 AND link_red_social = $3",
    getPaises: "SELECT * FROM pais",
    getCiudades: "SELECT * FROM ciudad",
    addPersonalInformation: "INSERT INTO usuario_info_personal (id_usuario,telefono,id_ciudad,genero) VALUES ($1,$2,$3,$4)",
    getUserCV: "SELECT cv FROM usuarios WHERE id_usuario = $1",
    updateCV: "UPDATE usuarios SET cv = $1 WHERE id_usuario = $2",
    selectAdministratorAccount: "SELECT * FROM administrador WHERE email = $1",
    addVacante: "INSERT INTO vacante (titulo, domicilio, descripcion, requisitos, fecha_cierre, empresa_id, estado) VALUES ($1,$2,$3,$4,$5,$6,$7)",
    getVacantes: "SELECT * FROM vacante WHERE empresa_id = $1",
    getPostulantes: "SELECT * FROM vista_postulantes_completa WHERE vacante_id = $1",
    updateStateFromVacante: "UPDATE vacante SET estado = $1 WHERE id = $2",
    updateVacante: "UPDATE vacante SET titulo = $1, domicilio = $2, descripcion = $3, requisitos = $4, fecha_cierre = $5 WHERE id = $6",
    getAllVacantes: "SELECT v.id AS vacante_id, v.titulo, v.domicilio, v.descripcion, v.requisitos, v.fecha_publicacion, v.fecha_cierre, v.estado, e.id AS empresa_id, e.nombre AS empresa_nombre, e.direccion AS empresa_direccion, e.telefono AS empresa_telefono, e.descripcion AS empresa_descripcion, e.email AS empresa_email FROM vacante v JOIN empresa e ON v.empresa_id = e.id WHERE v.estado = 'Activa'",
    getVacanteInfo: "SELECT v.id AS vacante_id, v.titulo, v.domicilio, v.descripcion, v.requisitos, v.fecha_publicacion, v.fecha_cierre, v.estado, e.id AS empresa_id, e.nombre AS empresa_nombre, e.direccion AS empresa_direccion, e.telefono AS empresa_telefono, e.descripcion AS empresa_descripcion, e.email AS empresa_email FROM vacante v JOIN empresa e ON v.empresa_id = e.id WHERE v.id = $1",
    addPostulante: "INSERT INTO cv_postulante (id_usuario, vacante_id, cv, descripcion, estado) VALUES ($1, $2, $3, $4, 'Pendiente por revisar')",
    addNotification: "INSERT INTO notificacion (titulo, mensaje, usuario_id) VALUES ($1, $2, $3)",
    getUserNotifications: "SELECT * FROM notificacion WHERE usuario_id = $1",
    getPostulanteCV: "SELECT * FROM cv_postulante WHERE id = $1",
    updatePostulanteEstado: "UPDATE cv_postulante SET estado = $1 WHERE id = $2",
    addVacanteToGuardados: "INSERT INTO guardados (id_usuario, id_vacante) VALUES($1, $2)",
    getVacantesGuardadas: "SELECT * FROM vista_vacantes_guardadas WHERE id_usuario = $1",
    deleteFromGuardados: "DELETE FROM guardados WHERE id_usuario = $1 AND id_vacante = $2"
};

export default querys;