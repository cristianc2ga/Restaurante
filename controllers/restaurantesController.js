var restaurante = require('../model/restaurante');
const{body, validationResult} = require('express-validator');

var borrar = require("fs");

module.exports = {
    index:function(req, res){
        restaurante.obtener()
                   .then(datos => {
                    res.render('restaurantes/index', { title: 'Aplicacion', restaurantes:datos });
                   })
                   .catch(err => {
                    return res.status(500).send("Error obteniendo restaurantes");
                   });
    },
    crear:function(req, res){
        res.render('restaurantes/crear');
    },

    guardar:function(req, res){
        console.log(req.body);
        // console.log(req.file.filename);
        restaurante.insertar(req.body,req.file)
                   .then(idRestauranteCreado => {
                    res.redirect("/restaurantes");
                   })
                   .catch(err=>{
                    return res.status(500).send("Error creando restaurante");
                   });
    },
    eliminar:function(req, res){
        restaurante.retornarDatosId(req.params.id)
                   .then(registro=>{
                    if(registro){
                        var nombreImagen = "public/images/"+(registro.foto);
                        console.log(nombreImagen);
                        if(nombreImagen!="public/images/" && borrar.existsSync(nombreImagen)){
                            borrar.unlinkSync(nombreImagen);
                        }
                    }else{
                        return res.status(500).send("No existe el restaurante con ese id");
                    }
                   })
                   .catch(err=>{
                    return res.status(500).send("Error obteniendo el restaurante");
                   });

        restaurante.borrar(req.params.id)
                   .then(()=>{
                    res.redirect("/restaurantes");
                   })
                   .catch(err=>{
                    return res.status(500).send("Error eliminando el restaurante");
                   });
            //res.send(nombreImagen);
    },
    editar:function(req, res){
        restaurante.retornarDatosId(req.params.id)
                .then(registro=>{
                    if(registro){
                        // console.log(registro.id);
                        res.render('restaurantes/editar',{ restaurante:registro});
                    }else{
                        return res.status(500).send("No existe el restaurante con ese id");
                    }
                })
                .catch(err=>{
                    return res.status(500).send("Error obteniendo el restaurante");
                });
        
    },
    actualizar:function(req, res){
        // console.log(req.body);
        if(req.file){
            if(req.file.filename){
                console.log(req.body.id);
                restaurante.retornarDatosId(req.body.id)
                   .then(registro=>{
                        if(registro){
                            var nombreImagen = "public/images/"+(registro.foto);
                            console.log(nombreImagen);
                            if(nombreImagen!="public/images/" && borrar.existsSync(nombreImagen)){
                                borrar.unlinkSync(nombreImagen);
                                console.log("Borrado correcto");
                            }
                            restaurante.actualizarArchivo(req.body,req.file)
                                        .then(()=>{

                                        })
                                        .catch(err=>{
                                            return res.status(500).send("Error actualizando imagen del restaurante");
                                        });
                        }else{
                            return res.status(500).send("No existe el restaurante con ese id");
                        }                    
                   })
                   .catch(err=>{
                    return res.status(500).send("Error obteniendo el restaurante");
                   });
            }
        }
        console.log(req.body);
        restaurante.actualizar(req.body)
                       .then(()=>{
                        res.redirect("/restaurantes");
                       })
                       .catch(err=>{
                        return res.status(500).send("Error actualizando el restaurante");
                       });
    },
    disponibles:function(req, res){
        restaurante.obtenerDisponibles()
                   .then(datos => {
                    res.render('restaurantes/disponibles', { restaurantes:datos });
                   })
                   .catch(err => {
                    return res.status(500).send("Error obteniendo restaurantes");
                   });
    }
}