var mongoose = require('mongoose');

var localdburl = 'mongodb://localhost:27017/meanhotel';
var mlabdburl = 'mongodb://testuser:test@ds111059.mlab.com:11059/node-todo-app-yuan';
var _connection = null;
var _collection = null;
var dbName = 'node-todo-app-yuan';
var connectionString = localdburl;

mongoose.connect(connectionString);

mongoose.connection.on('connected', function() {
    console.log('Mongoose connected to ' + connectionString);
});

mongoose.connection.on('disconnected', function() {
    console.log('Mongoose disconnected');
});

mongoose.connection.on('error', function (err) {
    console.log('Mongoose connection err: ' + err);
});

process.on('SIGINT', function(){
    mongoose.connection.close(function(){
        console.log('Mongoose disconnected through app termination (SIGINT)');
        process.exit(0);
    });
});

process.on('SIGTERM', function(){
    mongoose.connection.close(function(){
        console.log('Mongoose disconnected through app termination (SIGTERM)');
        process.exit(0);
    });
});

process.once('SIGUSR2', function(){ //use once event to kill the process
    mongoose.connection.close(function(){
        console.log('Mongoose disconnected through app termination (SIGUSR2)');
        process.kill(process.pid, 'SIGUSR2');
    });
});

// BRING IN SCHEMAS AND MODELS
require('./hotels.model.js');