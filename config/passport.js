const passport = require('passport');
const LocalStrategy = require('passport-local');
const Usuarios = require('../models/usuarios');

passport.use(
    new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        },

        async(email, password, done) => {

            try {
                const usuario = await Usuarios.find({
                    where: { email: email }
                });
                if (!usuario.verificarPassword(password)) {
                    return done(null, false, {
                        message: 'Password incorrecto!'
                    });
                }
                return done(null, usuario);
            } catch (error) {
                return done(null, false, {
                    message: 'Cuenta no existe!!'
                });
            }

        }
    )
);

passport.serializeUser((usuario, callback) => {
    callback(null, usuario);
});

passport.deserializeUser((usuario, callback) => {
    callback(null, usuario);
});

module.exports = passport;