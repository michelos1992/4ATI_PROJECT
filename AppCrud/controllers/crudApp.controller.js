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

exports.update = (req, res) => {
    const id = req.params.id;

    appCrud.update(req.body, {
        where: { id: id }
    })
    .then(num => {
        if(num == 1) {
            res.send ({
                message: "App was update successfully"
            });
        }else {
            res.send ({
                message: `Cannot update app with id=${id}. Maybe app was not found or empty records`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating app with id=" +id
        });
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    appCrud.destroy({
        where: { id: id }
    }).then(num=> {
        if(num == 1) {
            res.send({
                message: "App was deleted successfully!"
            });
        }else {
            res.send({
                message: `Cannot delete app with id=${id}.`
            });
        }
    }).catch(err => {
        res.status(500).send ({
            message: "Could not delete app with id " + id
        });
    });
};

exports.deleteAll = (req, res) => {
    appCrud.destroy({
        where: {},
        truncate: false
    }).then(nums=> {
        res.send({
            message: `${nums} App were deleted successfully!`
        });        
    }).catch(err => {
        res.status(500).send ({
            message:
                err.message || "Some error occured while removing all records"
        });
    });
}
