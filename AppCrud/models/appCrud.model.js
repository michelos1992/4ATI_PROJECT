module.exports = (sequelize, Sequelize) => {
    const appCrud = sequelize.define('appCrud', {
        title: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        published: {
            type: Sequelize.BOOLEAN
        }
    });
    return appCrud;
}