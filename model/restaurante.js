var conexion = require("../config/conexion");

module.exports = {
  obtener() {
    return new Promise((resolve, reject) => {
      conexion
        .query("SELECT * FROM restaurantes")
        .then((resultados) => {
          resolve(resultados.rows);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  insertar(datos, archivos,userId) {
    console.log(archivos.filename);
    return new Promise((resolve, reject) => {
      conexion
        .query(
          "INSERT INTO restaurantes (nombre, descripcion, direccion, ciudad, foto,iduser) VALUES ($1, $2, $3, $4, $5,$6) RETURNING id",
          [
            datos.nombre,
            datos.descripcion,
            datos.direccion,
            datos.ciudad,
            archivos.filename,
            userId
          ]
        )
        .then((resultados) => {
          resolve(resultados.rows[0].id);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  retornarDatosId(id) {
    return new Promise((resolve, reject) => {
      conexion
        .query("SELECT * FROM restaurantes WHERE id = $1", [id])
        .then((resultados) => {
          if (resultados.rows.length > 0) {
            resolve(resultados.rows[0]);
          } else {
            resolve(null);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  borrar(id) {
    return new Promise((resolve, reject) => {
      conexion
        .query('DELETE FROM restaurantes WHERE id = $1', [id])
        .then(() => {
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  actualizar(datos) {
    return new Promise((resolve, reject) => {
      conexion
        .query(
          'UPDATE restaurantes SET nombre=$1, descripcion=$2, direccion=$3, ciudad=$4 WHERE id=$5',
          [datos.nombre, datos.descripcion, datos.direccion, datos.ciudad, datos.id]
        )
        .then(() => {
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  actualizarArchivo(datos, archivos) {
    return new Promise((resolve, reject) => {
      conexion
        .query('UPDATE restaurantes SET foto=$1 WHERE id=$2', [archivos.filename, datos.id])
        .then(() => {
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  obtenerDisponibles() {
    return new Promise((resolve, reject) => {
      conexion
        .query('SELECT * FROM restaurantes WHERE reservas < $1', [15])
        .then((resultados) => {
          resolve(resultados.rows);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  actualizarReserva(idRestaurante, nReservas) {
    return new Promise((resolve, reject) => {
      conexion
        .query('UPDATE restaurantes SET reservas=$1 WHERE id=$2', [nReservas, idRestaurante])
        .then(() => {
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  obtenerPorIdUsuario(id) {
    console.log(id)
    return new Promise((resolve, reject) => {
      conexion.query(
        "SELECT * FROM restaurantes WHERE iduser=$1",
        [id],
        (err, resultados) => {
          if (err) reject(err);
          else resolve(resultados);
        }
      );
    });
  },
};
