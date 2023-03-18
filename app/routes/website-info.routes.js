let upload = require('../config/multer.config.js');
const { authJwt } = require("../middleware");
const controller = require('../controllers/website-info.controller.js');

module.exports = app => {

    var router = require("express").Router();

    router.post('/',
    [authJwt.verifyToken],
    upload.single("websiteImage"), 
    controller.postWebsiteInfo
    );

    router.put('/:id',
    [authJwt.verifyToken],
    upload.single("websiteImage"), 
    controller.updateWebsiteInfo
    );

    router.get('/',
    // [authJwt.verifyToken],
    controller.getWebsiteInfo
    );

    router.get('/img/:id',
    // [authJwt.verifyToken],
    controller.getImageWebsiteInfo
    );

    router.delete("/:id",
    [authJwt.verifyToken], 
    controller.deleteWebsiteInfo);
    
    app.use('/api/website-info', router);
};