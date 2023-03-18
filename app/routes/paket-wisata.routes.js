let upload = require('../config/multer.config.js');
const { authJwt } = require("../middleware");
const controller = require('../controllers/paket-wisata.controller.js');

module.exports = app => {

    var router = require("express").Router();

    router.post('/',
    [authJwt.verifyToken],
    upload.single("paketWisataImg"), 
    controller.postPaketWisata
    );

    router.put('/:id',
    [authJwt.verifyToken],
    upload.single("paketWisataImg"), 
    controller.updatePaketWisata
    );

    router.get('/',
    // [authJwt.verifyToken],
    controller.getAllPaketWisata
    );

    router.get('/:id',
    // [authJwt.verifyToken],
    controller.getByIdPaketWisata
    );

    router.get('/img/:id',
    // [authJwt.verifyToken],
    controller.getImageWisata
    );

    router.delete("/:id",
    [authJwt.verifyToken], 
    controller.deletePaketWisata);
    
    app.use('/api/paket-wisata', router);
};