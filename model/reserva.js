var conexion = require('../config/conexion');

module.exports={
    obtener() {
        return new Promise((resolve, reject) => {
          conexion
            .query('SELECT fecha::date as fecha, id, nombre, apellido, hora, mesa, personas, idRestaurante, restaurante FROM reservas')
            .then((resultados) => {
              resolve(resultados.rows);
            })
            .catch((err) => {
              reject(err);
            });
        });
      },
      insertar(datos,userId) {
        console.log(userId)
        return new Promise((resolve, reject) => {
          conexion.query(
            "INSERT INTO reservas (nombre, apellido, fecha, hora, mesa, personas, idRestaurante, restaurante, iduser) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id",
            [datos.nombre, datos.apellido, datos.fecha, datos.hora, datos.mesa, datos.personas, datos.idRestaurante, datos.restaurante, userId],
            (err, resultados) => {
              if (err) reject(err);
              else resolve(resultados.rows[0].id);
            }
          );
        });
      },
      retornarDatosId(id) {
        return new Promise((resolve, reject) => {
          conexion.query(
            "SELECT * FROM reservas WHERE id=$1",
            [id],
            (err, resultados) => {
              if (err) reject(err);
              else resolve(resultados.rows[0]);
            }
          );
        });
      }
      ,
      borrar(id) {
        return new Promise((resolve, reject) => {
          conexion.query("DELETE FROM reservas WHERE id=$1", [id], (err) => {
            if (err) reject(err);
            else resolve();
          });
        });
      }
      ,
    actualizar(datos) {
      return new Promise((resolve, reject) => {
        conexion.query(
          "UPDATE reservas SET nombre=$1, apellido=$2, fecha=$3, hora=$4, mesa=$5, personas=$6 WHERE id=$7",
          [datos.nombre, datos.apellido, datos.fecha, datos.hora, datos.mesa, datos.personas, datos.id],
          (err) => {
            if (err) reject(err);
            else resolve();
          }
        );
      });
    }
    ,
    obtenerDatosIdRestaurante(id) {
        return new Promise((resolve, reject) => {
          conexion.query(
            "SELECT mesa FROM reservas WHERE idrestaurante=$1",
            [id],
            (err, resultados) => {
              if (err) reject(err);
              else resolve(resultados);
            }
          );
        });
      },
      obtenerPorIdUsuario(id) {
        console.log(id)
        return new Promise((resolve, reject) => {
          conexion.query(
            "SELECT fecha::date as fecha, id, nombre, apellido, hora, mesa, personas, idRestaurante, restaurante FROM reservas WHERE iduser=$1",
            [id],
            (err, resultados) => {
              if (err) reject(err);
              else resolve(resultados);
            }
          );
        });
      },
    
}