const passport = require('passport');
const crypto = require('crypto');
const Usuarios = require('../models/usuarios');

autenticarUsuario = passport.authenticate('local', {

    successRedirect: '/',
    failureRedirect: '/iniciar-sesion',
    failureFlash: true,
    badRequestMessage: 'Ambos Campos Son Obligatorios!'

});

usuarioAutenticado = (req, resp, next) => {
    if (req.isAuthenticated()) {
        return next();
    }

    return resp.redirect('/iniciar-sesion');
}

cerrarSesion = (req, resp) => {
    req.session.destroy(() => {
        resp.redirect('/');
    });

}

enviarToken = async(req, resp) => {

    const usuario = await Usuarios.findOne({
        where: { email: req.body.email }
    })

    if (!usuario) {
        req.flash('error', 'No existe esta cuenta.');
        resp.render('restablecer', {
            nombrePagina: 'Restablecer Password',
            error: 'La cuenta no existe.'
        });
    }

    //enviar token
    usuario.token = crypto.randomBytes(20).toString('hex');
    usuario.expiracion = Date.now() + 3600000;

    await usuario.save();

    const resetUrl = `http://${req.headers.host}/restablecer/${usuario.token}`;

    await enviarEmail.enviar({
        usuario,
        subject: 'Password Reset',
        resetUrl,
        archivo: 'restablecer-password'
    });

    req.flash('correcto', 'Se ha enviado un mensaje a tu correo');
    resp.redirect('/iniciar-sesion');

}

resetPassword = async(req, resp) => {

    resp.json(req.params.token);

};

module.exports = {

    autenticarUsuario,
    usuarioAutenticado,
    cerrarSesion,
    enviarToken,
    resetPassword

};