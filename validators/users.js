const{check} = require('express-validator');
const {validateResult} = require('../helpers/validateHelperUsers');

const validateCreate = [
    check('nombre')
    .exists()
    .not()
    .isEmpty(),
    check('email')
    .exists()
    .not()
    .isEmpty(),
    check('password')
    .exists()
    .not()
    .isEmpty(),
    check('userType')
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