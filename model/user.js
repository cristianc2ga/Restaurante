var conexion = require("../config/conexion");
const bcrypt = require('bcrypt');


module.exports = {
  obtener() {
    return new Promise((resolve, reject) => {
      conexion
        .query("SELECT * FROM usuarios")
        .then((resultados) => {
          resolve(resultados.rows);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  insertar(datos) {
    console.log(datos);
    return new Promise((resolve, reject) => {
        if (datos.password !== datos.confirmPassword) {
            // Si las contraseñas no coinciden, rechazamos la promesa con un mensaje de error
            reject("Las contraseñas no coinciden");
            return;
        }

        // Las contraseñas coinciden, procedemos con el hashing de la contraseña
        bcrypt.hash(datos.password, 10, (err, hash) => {
            if (err) {
                reject(err);
                return;
            }

            // Ahora, 'hash' contiene la contraseña encriptada
            // Procedemos con la inserción en la base de datos
            conexion.query(
                "INSERT INTO usuarios (nombre, correo, contrasena, role) VALUES ($1, $2, $3, $4) RETURNING id",
                [
                    datos.nombre,
                    datos.email,
                    hash, // Utilizamos 'hash' en lugar de 'datos.password'
                    datos.userType,
                ]
            )
            .then((resultados) => {
                resolve(resultados.rows[0].id);
            })
            .catch((err) => {
                reject(err);
            });
        });
    });
}
,
  retornarDatosId(id) {
    return new Promise((resolve, reject) => {
      conexion
        .query("SELECT * FROM usuarios WHERE id = $1", [id])
        .then((resultados) => {
          resolve(resultados.rows[0]);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  borrar(id) {
    return new Promise((resolve, reject) => {
      conexion
        .query('DELETE FROM usuarios WHERE id = $1', [id])
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
          'UPDATE usuarios SET nombre=$1, correo=$2, role=$3 WHERE id=$4',
          [datos.nombre, datos.correo, datos.role, datos.id]
        )
        .then(() => {
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  buscarPorEmail(email) {
    return new Promise((resolve, reject) => {
        conexion.query(
            "SELECT * FROM usuarios WHERE correo = $1 LIMIT 1",
            [email]
        )
        .then((resultados) => {
            // Si encontramos un usuario con el correo electrónico, resolvemos la promesa con el usuario encontrado
            if (resultados.rows.length > 0) {
                resolve(resultados.rows[0]);
            } else {
                // Si no encontramos un usuario con el correo electrónico, resolvemos la promesa con null
                resolve(null);
            }
        })
        .catch((err) => {
            reject(err);
        });
    });
},

};
