const con = require('../config/conexion');
var reserva = require('../model/reserva');
var restaurante = require('../model/restaurante');

module.exports = {
    index:function(req, res){
                    reserva.obtener()
                           .then(datos => {
                            res.render('reservas/index', { title: 'Aplicacion',reservas:datos });
                           })
                           .catch(err => {
                            return res.status(500).send("Error obteniendo reservas");
                           });
    },
    crear:function(req, res){
        console.log(req.params.idRestaurante);
        
        restaurante.retornarDatosId(req.params.idRestaurante)
                .then(registro=>{
                    if(registro){
                        reserva.obtenerDatosIdRestaurante(req.params.idRestaurante)
                                .then(registroRes=>{
                                    if(registroRes){
                                        var nMesas = new Array(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15);
                                        var resultArray = Object.values(JSON.parse(JSON.stringify(registroRes)))
                                        // console.log(resultArray)
                                        var temp = [];
                                        if (resultArray.length >= 4 && Array.isArray(resultArray[3])) {
                                            temp = resultArray[3].map(item => item.mesa);
                                          }
                                        var mesasDisponibles = nMesas.filter(element => !temp.includes(element))
                                        console.log(mesasDisponibles);
                                        res.render('reservas/crear',{ mesasDisponibles:mesasDisponibles,restaurante:registro});
                                    }
                                    else{
                                        return res.status(500).send("No existen reserva en el restaurante");
                                    }
                                })
                                .catch(err => {
                                    return res.status(500).send("Error obteniendo la reservas para el restaurante");
                                })
                    }else{
                    }
                })
                .catch(err=>{
                    return res.status(500).send("Error obteniendo el restaurante");
                });
        
    },

    insertar:function(req, res){
        console.log(req.body);
        if(req.body.personas > 4){
            return res.status(500).send("Supera el número máximo de personas, intente con un valor menor o igual a 4");
        }
        restaurante.retornarDatosId(req.body.idRestaurante)
                .then(registro=>{
                    if(registro){
                        var nReservas = registro.reservas + 1;
                        restaurante.actualizarReserva(req.body.idRestaurante,nReservas)
                                   .then(()=>{
                                        reserva.insertar(req.body)
                                               .then(idReservaCreada =>{
                                                    res.redirect('/reservas');
                                               })
                                               .catch(err=>{
                                                 return res.status(500).send("Error creando la reserva");
                                               });
                                   })
                                   .catch(err=>{
                                        return res.status(500).send("Error actualizando las reservas del restaurante");
                                   });
                    }else{
                        return res.status(500).send("No existe el restaurante con ese id");
                    }
                })
                .catch(err=>{
                    return res.status(500).send("Error obteniendo el restaurante");
                });
        
    },
    eliminar:function(req, res){
        reserva.retornarDatosId(req.params.id)
                .then(registro=>{
                    restaurante.retornarDatosId(registro.idrestaurante)
                                .then(registroRes=>{
                                    if(registroRes){
                                        var nReservas = registroRes.reservas - 1;
                                        restaurante.actualizarReserva(registroRes.id,nReservas)
                                                    .then(()=>{
                                                        reserva.borrar(req.params.id)
                                                        .then(()=>{
                                                         res.redirect("/reservas");
                                                        })
                                                        .catch(err=>{
                                                         return res.status(500).send("Error eliminando la reserva");
                                                        });
                                                    })
                                                    .catch(err=>{
                                                            return res.status(500).send("Error actualizando las reservas del restaurante");
                                                    });
                                    }else{
                                        return res.status(500).send("No existe el restaurante con ese id");
                                    }
                                })
                                .catch(err=>{
                                    return res.status(500).send("Error obteniendo el restaurante");
                                });
                })
                .catch(err=>{
                    return res.status(500).send("Error obteniendo la reserva por id");
                });
    },
    editar:function(req, res){
        console.log(req.params.id)
        reserva.retornarDatosId(req.params.id)
                .then(registro=>{
                    if(registro){
                        reserva.obtenerDatosIdRestaurante(registro.idRestaurante)
                                .then(registroRes=>{
                                    if(registroRes){
                                        var nMesas = new Array(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15);
                                        var resultArray = Object.values(JSON.parse(JSON.stringify(registroRes)))
                                        var temp = [];
                                        if (resultArray.length >= 4 && Array.isArray(resultArray[3])) {
                                            temp = resultArray[3].map(item => item.mesa);
                                          }
                                        var mesasDisponibles = nMesas.filter(element => !temp.includes(element))
                                        // console.log(mesasDisponibles);
                                        res.render('reservas/editar',{ mesasDisponibles:mesasDisponibles,reserva:registro});
                                    }
                                    else{
                                        return res.status(500).send("No existen reserva en el restaurante");
                                    }
                                })
                                .catch(err => {
                                    return res.status(500).send("Error obteniendo la reservas para el restaurante");
                                })

                    }else{
                        return res.status(500).send("No existe la reserva");
                    }
                })
                .catch(err=>{
                    return res.status(500).send("Error obteniendo la reserva");
                });
        
    },
    actualizar:function(req, res){
        // console.log(req.body);
        reserva.retornarDatosId(req.body.id)
                .then(registro=>{
                    if(registro){
                        reserva.obtenerDatosIdRestaurante(registro.idRestaurante)
                                .then(registroRes=>{
                                    if(registroRes){
                                        // console.log(registroRes);
                                        var nMesas = new Array(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15);
                                        var resultArray = Object.values(JSON.parse(JSON.stringify(registroRes)))
                                        var temp = [];
                                        if (resultArray.length >= 4 && Array.isArray(resultArray[3])) {
                                            temp = resultArray[3].map(item => item.mesa);
                                          }
                                        var mesasDisponibles = nMesas.filter(element => temp.includes(element))
                                        

                                        let existeElemento = mesasDisponibles.includes( parseInt(req.body.mesa) )
                                        console.log(existeElemento);
                                        if(existeElemento && parseInt(req.body.mesa) == registro.mesa){
                                            return res.status(400).send("Esta mesa ya esta reservada regrese y seleccione una de las mesas disponibles");
                                        }
                                        reserva.actualizar(req.body)
                                                .then(()=>{
                                                res.redirect("/reservas");
                                                })
                                                .catch(err=>{
                                                return res.status(500).send("Error actualizando la reserva");
                                                });
                                    }
                                    else{
                                        return res.status(500).send("No existen reservas en el restaurante");
                                    }
                                })
                                .catch(err => {
                                    return res.status(500).send("Error obteniendo la reservas para el restaurante");
                                })

                    }else{
                        return res.status(500).send("No existe la reserva");
                    }
                })
                .catch(err=>{
                    return res.status(500).send("Error obteniendo la reserva");
                });
        // reserva.actualizar(req.body)
        // .then(()=>{
        //  res.redirect("/reservas");
        // })
        // .catch(err=>{
        //  return res.status(500).send("Error actualizando la reserva");
        // });
    }
        
        

}