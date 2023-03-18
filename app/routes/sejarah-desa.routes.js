let upload = require('../config/multer.config.js');
const { authJwt } = require("../middleware");
const controller = require('../controllers/sejarah-desa.controller.js');

module.exports = app => {

    var router = require("express").Router();

    router.post('/',
    [authJwt.verifyToken],
    controller.postSejarahDesa
    );

    router.put('/:id',
    [authJwt.verifyToken],
    controller.updateSejarahDesa
    );

    router.get('/',
    // [authJwt.verifyToken],
    controller.getAllSejarahDesa
    );

    router.get('/:id',
    // [authJwt.verifyToken],
    controller.getByIdSejarahDesa
    );

    router.delete("/:id",
    [authJwt.verifyToken], 
    controller.deleteSejarahDesa);
    
    app.use('/api/sejarah-desa', router);
};