var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var q = require('q');

var connectionString = 'mongodb://127.0.0.1:27017/formMaker';

//if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
//    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
//        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
//        process.env.OPENSHIFT_APP_NAME;
//    }
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}

var db = mongoose.connect(connectionString);

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

//require('./public/assignment/server/app.js')(app);
require('./public/assignment/server/app.js')(app, db, mongoose);
require('./public/project/server/app.js')(app);

app.get('/hello', function(req, res){
    res.send('hello world from webstorm');
});

app.use(express.static(__dirname + '/public'));
app.listen(port, ipaddress);

