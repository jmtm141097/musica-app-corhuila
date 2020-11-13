const Usuarios = require('../models/usuarios');

loginPage = async(req, res) => {

    res.render('iniciarSesion', {
        nombrePagina: 'Iniciar Sesion'
    });

};

formCrearCuenta = async(req, res) => {

    res.render('crearCuenta', {
        nombrePagina: 'Creacion de cuentas'
    })

};

crearCuenta = async(req, resp) => {
    //console.log(request.body);
    const { email, password } = req.body;

    try {
        await Usuarios.create({
            email,
            password
        });
        resp.redirect('/iniciar-sesion');
    } catch (error) {
        req.flash('error', error.errors.map(error => error.message));
        resp.render('crearCuenta', {
            mensajes: req.flash(),
            // errores: error.errors,
            nombrePagina: 'Crear Cuenta Plataforma',
            email,
            password
        });
    }
}

module.exports = {
    loginPage,
    formCrearCuenta,
    crearCuenta
};