var mysql = require('mysql');

var con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'restaurante'
});

con.connect(
    (err)=>{
        if(!err){
            console.log('Conexión Correcta¡');
        }else{
            console.log('Erro de Conexión¡');
        }
    }
);

module.exports = con;