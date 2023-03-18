let upload = require('../config/multer.config.js');
const { authJwt } = require("../middleware");
const controller = require('../controllers/kontak.controller.js');

module.exports = app => {

    var router = require("express").Router();

    router.post('/',
    [authJwt.verifyToken],
    controller.postKontak
    );

    router.put('/:id',
    [authJwt.verifyToken],
    controller.updateKontak
    );

    router.get('/',
    // [authJwt.verifyToken],
    controller.getAllKontak
    );

    router.get('/:id',
    // [authJwt.verifyToken],
    controller.getByIdKontak
    );

    router.delete("/:id",
    [authJwt.verifyToken], 
    controller.deleteKontak);
    
    app.use('/api/kontak', router);
};