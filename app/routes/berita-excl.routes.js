let upload = require('../config/multer.config.js');
const { authJwt } = require("../middleware");
const controller = require('../controllers/berita-excl.controller.js');

module.exports = app => {

    var router = require("express").Router();

    router.post('/',
    [authJwt.verifyToken],
    upload.single("imageNews"), 
    controller.postBerita
    );

    router.put('/:id',
    [authJwt.verifyToken],
    upload.single("imageNews"), 
    controller.updateBerita
    );

    router.get('/',
    // [authJwt.verifyToken],
    controller.getAllBerita
    );

    router.get('/groups/:groupName',
    // [authJwt.verifyToken],
    controller.getBeritaByGroups
    );

    router.get('/slug/:slug',
    // [authJwt.verifyToken],
    controller.getBySlug
    );

    router.get('/top-5/all',
    // [authJwt.verifyToken],
    controller.getBeritaTop5
    );

    router.get('/:id',
    // [authJwt.verifyToken],
    controller.getByIdBerita
    );

    router.get('/img/:id',
    // [authJwt.verifyToken],
    controller.getImageBerita
    );

    router.delete("/:id",
    [authJwt.verifyToken], 
    controller.deleteBerita);
    
    app.use('/api/berita-excl', router);
};