var dbconn = require('../data/dbconnection.js');
var hotelData = require('../data/hotel-data.json');
//var ObjectId = require('mongodb').ObjectId;
var collectionName = 'meanhotel';

var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');

module.exports.hotelsGetAll = function(req, res) {
    // Native driver
    // var db = dbconn.get();
    // var collection = db.db().collection(collectionName);

    var offset = 0;
    var count = 5;

    if(req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }

    if(req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }

    // Native driver
    // collection
    // .find().skip(offset).limit(count).toArray(function(err, docs) {
    //     console.log('Found hotels', docs);
    //     res.status(200).json(docs);
    // });

    // Mongoose with model
    Hotel.find().skip(offset).limit(count).exec(function(err, hotels) {
        if(err) {
            console.log(err);
            res.json(err);
        } else {
            console.log('Found hotels', hotels.length);
            res.json(hotels);
        }
        
    });
}

module.exports.hotelsGetOne = function(req, res) {
    var db = dbconn.get();
    var collection = db.db().collection(collectionName);

    var hotelId = req.params.hotelId;
    var thisHotel = hotelData[hotelId];
    console.log('GET hotelId ', hotelId);
    
    collection
    .findOne({
        _id: ObjectId(hotelId)
    }, function(err, doc) {
        res
        .status(200)
        .json(doc);
    });
    
}

module.exports.hotelsAddOne = function(req, res) {
    var db = dbconn.get();
    var collection = db.db().collection(collectionName);
    var newHotel;
    console.log("POST new hotel");

    if(req.body && req.body.name && req.body.stars) {
        newHotel = req.body;
        newHotel.stars = parseInt(req.body.stars, 10);
        
        collection.insertOne(newHotel, function(err, response) {
            console.log(response.ops);
            res
            .status(201) // status code for new resource being created is 201
            .json(response.ops);
        });
        
    } else {
        res
        .status(400)
        .json({message: 'Required data missing from body'});
    }

    
}