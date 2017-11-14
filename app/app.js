module.exports = () => {
// APP - INCLUDE
const express = require('express')
const path = require("path")
const bodyParser = require("body-parser")
const hbs = require('hbs')
var xml2js = require('xml2js');
var parser = new xml2js.Parser();
var opn = require('opn');

// APP - DEFINITION
const app = express()

// APP - BUILD
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('views', __dirname+'/views/'); // Set The Views Directory
app.engine('html', require('hbs').__express);
app.set('view engine', 'html');

// EXPRESS ROUTE - INDEX
app.get('/', function (req, res) {
  res.render('index.html', {
    title: 'CUCM Toolbox'
  });
})

// EXPRESS ROUTING - INCLUDE - CUCM MAPPER
var routingextensions = require('./routes/cucmmapper2.js')(app);

// APP - START
app.listen(3000, function () {
  // console.log('Please keep this terminal open until finished as it is running the backend API communications with CUCM.')
});

// opn('http://localhost:3000');
}