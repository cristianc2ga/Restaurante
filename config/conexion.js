require('dotenv').config(); // Cargar las variables de entorno desde .env

// Load the PostgreSQL client library
const { Client } = require('pg');

// Create a new PostgreSQL client
const con = new Client({
  host: process.env.PG_HOST,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  port: process.env.PG_PORT,
  ssl: process.env.PG_SSL === 'true', // Enable SSL/TLS
});

// Connect to the PostgreSQL server
con.connect((err) => {
  if (!err) {
    console.log('Conexión Correcta¡');
  } else {
    console.error('Error de Conexión¡', err);
  }
});

module.exports = con;
// // Load the PostgreSQL client library
// const { Client } = require('pg');

// // Create a new PostgreSQL client
// const con = new Client({
//   host: 'localhost', // Update with your PostgreSQL host
//   user: 'postgres', // Update with your PostgreSQL username
//   password: '920611', // Update with your PostgreSQL password
//   database: 'Restaurant-app', // Update with your PostgreSQL database name
// });

// // Connect to the PostgreSQL server
// con.connect((err) => {
//   if (!err) {
//     console.log('Conexión Correcta¡');
//   } else {
//     console.error('Error de Conexión¡', err);
//   }
// });

// module.exports = con;
