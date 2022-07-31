const {validationResult} = require('express-validator');

const validateResult = (req, res, next) => {
    try {
        validationResult(req).throw()
        return next();
    } catch (err) {
        //res.status(403);
        // console.log({errors: err.array()});
        const valores = req.body;
        const validaciones = err.array();
        res.render('reservas/crear',{ validaciones: validaciones, valores: valores});
        // res.send({errors: err.array()});
    }
}

module.exports = {validateResult}