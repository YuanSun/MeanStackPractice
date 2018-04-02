var _ = require('underscore');
var MongoClient = require('mongodb').MongoClient;
var localdburl = 'mongodb://localhost:27017/meanhotel';
var mlabdburl = 'mongodb://testuser:test@ds111059.mlab.com:11059/node-todo-app-yuan';
var LOCAL = 'local';
var MLAB = 'mlab';
var _connection = null;
var _collection = null;
var dbName = 'node-todo-app-yuan';
var connectionString = mlabdburl;

var open = function(type){
    if (type === LOCAL) {
        connectionString = localdburl;
        dbName = '';
    }

    MongoClient.connect(connectionString, function(err, db) {
        if(err) {
            console.log("DB connectino failed" + err);
        }
        _connection = db;
        
        console.log('DB connection open ', db);
    });
};

var get = function() {
    return _connection;
};

var findAll = function(){
    MongoClient.connect('mongodb://localhost:27017/meanhotel', function(err, db) {
        db.db().collection('meanhotel').find().toArray(function(err, arr) {
            console.log(arr);
        })
    });
}

module.exports = {
    open: open,
    get: get,
    findAll: findAll,
    dbName: dbName
};