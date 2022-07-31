var express = require('express');
var router = express.Router();

const reservasController = require("../controllers/reservasController");
const { validateCreate } = require('../validators/reservas')



router.get('/', reservasController.index);
router.get('/crear/:idRestaurante', reservasController.crear);
router.post("/",reservasController.insertar);
router.post('/eliminar/:id', reservasController.eliminar);
router.get('/editar/:id', reservasController.editar);
router.post("/actualizar",reservasController.actualizar);


// router.post("/", reservasController.guardar);



module.exports = router;