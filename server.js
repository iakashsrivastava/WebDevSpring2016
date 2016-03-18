var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
require('./public/assignment/server/app.js')(app);
app.get('/hello', function(req, res){
    res.send('hello world from webstorm');
});

app.use(express.static(__dirname + '/public'));
app.listen(port, ipaddress);

