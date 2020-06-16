// env
require('dotenv').config()

// express
const express = require('express');
const app = express();

// controllers
const log = require('./controllers/logcontroller');
const user = require('./controllers/usercontroller');
const wish = require('./controllers/wishcontroller');

// database
const sequelize = require('./db');
sequelize.sync({force:true});
app.use(express.json());
app.use(require('./middleware/headers'));


app.use('/user', user);
app.use(require('./middleware/validate-session'));
app.use('/log', log);
app.use('/wish', wish);

app.listen(process.env.PORT, () => console.log(`app is listening on ${process.env.PORT}`));