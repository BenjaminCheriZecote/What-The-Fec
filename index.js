require('dotenv').config();
const express = require('express');
const app = express();
const router = require('./app/router.js');

const session = require('express-session');


PORT=process.env.PORT;
HOST=process.env.HOST;

app.set("view engine", "ejs");
app.set("views", "./app/views");
app.use('/static', express.static(__dirname + '/public'));

app.use(session({
    secret: 'une chaine de charactères aléatoire',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false }
}));


app.use(router);

app.listen(PORT, () => {
    console.log(`Running on : http://${HOST}:${PORT}`);
});




