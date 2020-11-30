module.exports = app => {
    const appCrud = require('../controllers/crudApp.controller.js');

    var router = require('express').Router();

    router.post('/', appCrud.create);
    router.get('/', appCrud.findAll);

    router.get('/:id', appCrud.findOne);

    app.use('/4ATI_PROJECT/AppCrud/routes', router);
}