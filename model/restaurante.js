var conexion = require('../config/conexion');

module.exports={
    obtener(){
        return new Promise((resolve, reject) => {
            conexion.query("SELECT * FROM restaurantes",
            (err, resultados) => {
                if (err) reject(err);
                else resolve(resultados);
            });            
        });
    },
    insertar(datos,archivos){
        return new Promise((resolve, reject) => {
            conexion.query("INSERT INTO restaurantes (nombre, descripcion,direccion,ciudad,foto) VALUES (?,?,?,?,?)",
            [datos.nombre,datos.descripcion,datos.direccion,datos.ciudad,archivos.filename],
            (err, resultados) => {
                if (err) reject(err);
                else resolve(resultados.insertId);
            });            
        });
    },
    retornarDatosId(id){
        return new Promise((resolve, reject) => {
            conexion.query("SELECT * FROM restaurantes WHERE id=?",[id],
            (err, resultados) => {
                if (err) reject(err);
                else resolve(resultados[0]);
            });
        });
    },
    borrar(id){
        return new Promise((resolve, reject) => {
            conexion.query("DELETE FROM restaurantes WHERE id=?",[id],
            (err) => {
                if (err) reject(err);
                else resolve();
            });            
        });
    },
    actualizar(datos){
        return new Promise((resolve, reject) => {
            conexion.query(`UPDATE restaurantes SET nombre=?, descripcion=?,direccion=?,ciudad=? WHERE id=?`,
            [datos.nombre,datos.descripcion,datos.direccion,datos.ciudad, datos.id],
            (err) => {
                if (err) reject(err);
                else resolve();
            });

        });
    },
    actualizarArchivo(datos,archivos){
        return new Promise((resolve, reject) => {
            conexion.query("UPDATE restaurantes SET foto=? WHERE id=?",
            [archivos.filename, datos.id],
            (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
    },
    obtenerDisponibles(){
        return new Promise((resolve, reject) => {
            conexion.query("SELECT * FROM restaurantes WHERE reservas<?",[15],
            (err, resultados) => {
                if (err) reject(err);
                else resolve(resultados);
            });            
        });
    },
    actualizarReserva(idRestaurante, nReservas){
        return new Promise((resolve, reject) => {
            conexion.query(`UPDATE restaurantes SET reservas=? WHERE id=?`,
            [nReservas, idRestaurante],
            (err) => {
                if (err) reject(err);
                else resolve();
            });

        });
    }
}