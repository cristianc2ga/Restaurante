var express = require('express');
var router = express.Router();
const restaurantesController = require("../controllers/restaurantesController");
const { validateCreate } = require('../validators/restaurantes')

var multer = require('multer');
var fecha = Date.now();

var rutaAlmacen = multer.diskStorage({
        destination:function(request, file, callback) {
            callback(null, './public/images/');
    },
    filename:function(request, file, callback) {
        console.log(file);
        callback(null, fecha+"_"+file.originalname);
    }
}
);

var cargar = multer({storage:rutaAlmacen});

/* GET home page. */
router.get('/', restaurantesController.index);
router.get('/crear', restaurantesController.crear);
router.post("/",cargar.single("archivo"),validateCreate, restaurantesController.guardar);
router.post('/eliminar/:id', restaurantesController.eliminar);
router.get('/editar/:id', restaurantesController.editar);
router.post("/actualizar", cargar.single("archivo"), restaurantesController.actualizar);
router.get('/disponibles', restaurantesController.disponibles);


module.exports = router;
