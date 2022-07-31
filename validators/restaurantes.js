const{check} = require('express-validator');
const {validateResult} = require('../helpers/validateHelperRestaurante');

const validateCreate = [
    check('nombre')
    .exists()
    .not()
    .isEmpty(),
    check('descripcion')
    .exists()
    .not()
    .isEmpty(),
    check('direccion')
    .exists()
    .not()
    .isEmpty(),
    check('ciudad')
    .exists()
    .not()
    .isEmpty(),
    // check('foto')
    // .exists()
    // .not()
    // .isEmpty(),
    (req,res,next) => {
        validateResult(req, res, next);
    }
]

module.exports = {validateCreate};