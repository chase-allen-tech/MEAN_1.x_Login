var express = require('express');
var morgan = require('morgan');
var app = express();
var port = process.env.PORT || 8000;
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var router = express.Router();
var routes = require('./app/routes/api')(router);
var path = require('path');

app.use(morgan('dev'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static(__dirname + '/public'));//gives front-end access to public folder
app.use('/api',routes);

mongoose.connect('mongodb://localhost:27017/tutorial', function(err){
    if(err){
        console.log('not connected to mongo db ' + err);
    } else {
        console.log('successfully connected to mongo db!');
    }
});

app.get('*', function(req, res){
    res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

app.listen(port, function(){
    console.log('running server on port ' + port);
});