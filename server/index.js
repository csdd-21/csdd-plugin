const { json } = require('express');
const express = require('express');
const bodyParser = require('body-parser');
const api = require('./api');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(api);
express.static('./imgs')
app.use(express.static('./imgs'))
app.use( '/imgs',express.static('imgs'))

app.listen('9003', function () {
    console.log("------ node express run in port 9003 ! ------");
})
