let upload = require('../config/multer.config.js');
const { authJwt } = require("../middleware");
const controller = require('../controllers/fasilitas.controller.js');

module.exports = app => {

    var router = require("express").Router();

    router.post('/',
    [authJwt.verifyToken],
    controller.postFasilitas
    );

    router.put('/:id',
    [authJwt.verifyToken],
    controller.updateFasilitas
    );

    router.get('/',
    // [authJwt.verifyToken],
    controller.getAllFasilitas
    );

    router.get('/:id',
    // [authJwt.verifyToken],
    controller.getByIdFasilitas
    );

    router.delete("/:id",
    [authJwt.verifyToken], 
    controller.deleteFasilitas);
    
    app.use('/api/fasilitas', router);
};