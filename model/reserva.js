var conexion = require('../config/conexion');

module.exports={
    obtener(){
        return new Promise((resolve, reject) => {
            conexion.query(`SELECT date_format(fecha, "%Y-%m-%d") as fecha, id, nombre,apellido,hora,mesa,personas,idRestaurante,restaurante FROM reservas`,
            (err, resultados) => {
                if (err) reject(err);
                else resolve(resultados);
            });            
        });
    },
    insertar(datos){
        return new Promise((resolve, reject) => {
            conexion.query("INSERT INTO reservas (nombre, apellido,fecha,hora,mesa,personas,idRestaurante,restaurante) VALUES (?,?,?,?,?,?,?,?)",
            [datos.nombre,datos.apellido,datos.fecha,datos.hora, datos.mesa,datos.personas,datos.idRestaurante,datos.restaurante],
            (err, resultados) => {
                if (err) reject(err);
                else resolve(resultados.insertId);
            });            
        });
    },
    retornarDatosId(id){
        return new Promise((resolve, reject) => {
            conexion.query("SELECT * FROM reservas WHERE id=?",[id],
            (err, resultados) => {
                if (err) reject(err);
                else resolve(resultados[0]);
            });
        });
    },
    borrar(id){
        return new Promise((resolve, reject) => {
            conexion.query("DELETE FROM reservas WHERE id=?",[id],
            (err) => {
                if (err) reject(err);
                else resolve();
            });            
        });
    },
    actualizar(datos){
        return new Promise((resolve, reject) => {
            conexion.query(`UPDATE reservas SET nombre=?, apellido=?,fecha=?,hora=?,mesa=?,personas=? WHERE id=?`,
            [datos.nombre,datos.apellido,datos.fecha,datos.hora, datos.mesa,datos.personas,datos.id],
            (err) => {
                if (err) reject(err);
                else resolve();
            });

        });
    },
    obtenerDatosIdRestaurante(id){
        return new Promise((resolve, reject) => {
            conexion.query("SELECT  mesa FROM reservas WHERE idRestaurante=?",[id],
            (err, resultados) => {
                if (err) reject(err);
                else resolve(resultados);
            });
        });
    },
    
}