const{check} = require('express-validator');
const {validateResult} = require('../helpers/validateHelperReserva');

const validateCreate = [
    check('nombre')
    .exists()
    .not()
    .isEmpty(),
    check('apellido')
    .exists()
    .not()
    .isEmpty(),
    check('fecha')
    .exists()
    .not()
    .isEmpty(),
    check('mesa')
    .exists()
    .not()
    .isEmpty(),
    check('personas')
    .exists()
    .not()
    .isEmpty(),
    (req,res,next) => {
        validateResult(req, res, next);
    }
]

module.exports = {validateCreate};