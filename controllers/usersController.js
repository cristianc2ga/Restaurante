var user = require('../model/user');
const{body, validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
var borrar = require("fs");

module.exports = {
    loginView:function(req, res){
        res.render('users/login');
    },
    crear:function(req, res){
        res.render('users/registro');
    },
    guardar: function (req, res) {
        console.log(req.body);
        user.insertar(req.body)
            .then(idUsuarioCreado => {
                res.redirect("/users/login");
            })
            .catch(err => {
                console.log("Error al crear el restaurante:", err);
                return res.status(500).send("Error creando restaurante: " + err.message);
            });
    },
    home: function (req, res) {
        const { email, password } = req.body;
    
        user.buscarPorEmail(email)
            .then(usuario => {
                if (!usuario) {
                    return res.render('users/login', { message: "Correo o contraseña incorrectos" });
                }
    
                // Verificar si la contraseña es correcta
                bcrypt.compare(password, usuario.contrasena, (err, result) => {
                    if (err) {
                        return res.render('users/login', { message: "Correo o contraseña incorrectos" });
                    }
    
                    if (result) {
                        // La contraseña es correcta, autenticar al usuario y redirigir a la página de inicio
                        res.locals.userId = usuario.id;
                        res.locals.userRole = usuario.role; // Aquí se establece correctamente el userRole en la sesión
                        req.session.userId = usuario.id; // Almacena el ID del usuario en la sesión para mantener la autenticación
                        req.session.userRole = usuario.role;
                        res.cookie('userId', usuario.id);
                        res.cookie('userRole', usuario.role);
                        if (usuario.role === "cliente") {
                            return res.render('homeUsers');
                        } else {
                            return res.render('homeRestaurantes');
                        }
    
                    } else {
                        // Contraseña incorrecta, redirigir al formulario de login con mensaje de error
                        return res.render('users/login', { message: "Correo o contraseña incorrectos" });
                    }
                });
            })
            .catch(err => {
                return res.render('homeUsers', { message: "Correo o contraseña incorrectos" });
            });
    },
    logout: function(req, res) {
        req.session.destroy((err) => {
          if (err) {
            console.log('Error al cerrar sesión:', err);
            return res.status(500).send('Error al cerrar sesión');
          }
          res.redirect('/');
        });
      },
    homeUsersView:function(req, res){
        res.render('homeUsers');
    },
    homeRestaurantesView:function(req, res){
        res.render('homeRestaurantes');
    },
}