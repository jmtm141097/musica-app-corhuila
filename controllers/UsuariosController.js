const Usuarios = require('../models/usuarios');

loginPage = async(req, resp) => {

    const { error } = resp.locals.mensajes;

    console.log(error);

    resp.render('iniciarSesion', {
        nombrePagina: 'Iniciar Sesion',
        error
    });

};

formCrearCuenta = async(req, resp) => {

    resp.render('crearCuenta', {
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
        console.log(error.errors);
        resp.render('crearCuenta', {
            mensajes: req.flash(),
            errores: error.errors,
            nombrePagina: 'Crear Cuenta Plataforma',
            email,
            password
        });
    }
};

formRestablecerPassword = async(req, resp) => {

    resp.render('restablecer', {
        nombrePagina: 'Restablecer password'
    });

};

module.exports = {
    loginPage,
    formCrearCuenta,
    crearCuenta,
    formRestablecerPassword
};