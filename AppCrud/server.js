const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const db = require('./models');
const PORT = process.env.PORT || 8080;

var corsOption = {
    origin: 'http://localhost:8081'
};

app.use(cors(corsOption));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

db.sequelize.sync({ force: true}).then(() => {
    console.log("Drop and re-sync db");
});

app.get('/', (req, res) => {
    res.json({message: 'welcom to my app'});
});

require('./routes/appCRUD.routes.js')(app);

app.listen(PORT, () => {
    console.log(`Server is runnig on port: ${PORT}.`);
});
