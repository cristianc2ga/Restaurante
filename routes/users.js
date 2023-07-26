var express = require('express');
var router = express.Router();
const usersController = require("../controllers/usersController.js");


// router.get('/', usersController.index);
router.get('/login', usersController.loginView);
router.get('/logout', usersController.logout);
router.get('/registro', usersController.crear);
router.post("/login" ,usersController.guardar);
router.get('/homeUsers', usersController.homeUsersView);
router.get('/homeRestaurantes', usersController.homeRestaurantesView);
router.post("/home", usersController.home);


module.exports = router;
