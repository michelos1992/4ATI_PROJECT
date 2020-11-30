const db = require('../models');
const appCrud = db.appCrud;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if(!req.body.title) {
        res.status(400).send({
            message: 'Contnet can not be empty!'
        });
        return;
    }

    const appCrud = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    };

    appCrud.create(appCrud).then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || 'Some error occured while creating the app'
        });
    });
};

exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.iLike]: `%${title}%` }} : null;

    appCrud.findAll({ where: condition }).then(data => { res.send(data);})
                    .catch(err => { res.status(500).send({
                        message:
                            err.message || 'Some error while retrieving app'
                    });
                });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    appCrud.findByPK(id).then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: 'Some error while retrieving app id' + id
        });
    });
};


