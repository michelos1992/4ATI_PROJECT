module.exports = app => {
    const appCrud = require('../controllers/crudApp.controller.js');

    var router = require('express').Router();

    router.post('/', appCrud.create);

    router.get('/', appCrud.findAll);
    router.get("/published", appCrud.findAllPublished);
    router.get('/:id', appCrud.findOne);

    router.put("/:id", appCrud.update);

    router.delete("/:id", appCrud.delete);
    router.delete("/", appCrud.deleteAll);

    app.use('/4ATI_PROJECT/AppCrud/routes', router);
}