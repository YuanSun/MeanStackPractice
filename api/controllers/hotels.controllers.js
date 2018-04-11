var dbconn = require('../data/dbconnection.js');
var hotelData = require('../data/hotel-data.json');
//var ObjectId = require('mongodb').ObjectId;
var collectionName = 'meanhotel';

var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');

var runGeoQuery = function(req, res) {
    var lng = parseFloat(req.query.lng);
    var lat = parseFloat(req.query.lat);

    // a geiJSON point
    var point = {
        type : "Point",
        coordinates: [lng, lat]
    };

    var geoOptions = {
        spherical: true,
        maxDistance : 2000,
        num : 5
    };

    Hotel
        .getNear(point, geoOptions, function(err, results, stats) {
            console.log('Geo results', results);
            console.log('Geo stats', stats);
            res
                .status(200)
                .json(results);
        });
}

module.exports.hotelsGetAll = function(req, res) {
    // Native driver
    // var db = dbconn.get();
    // var collection = db.db().collection(collectionName);

    var offset = 0;
    var count = 5;

    var maxCount = 10;
    if(req.query & req.query.lat && req.query.lng) {
        runGeoQuery(req, res);
        return;
    }

    if(req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }

    if(req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }

    if(isNaN(offset) || isNaN(count)) {
        res
            .status(400)
            .json({
                "message" : "If supplied in querystring count and offset should be numbers"
            });
        return;
    }
    // Native driver
    // collection
    // .find().skip(offset).limit(count).toArray(function(err, docs) {
    //     console.log('Found hotels', docs);
    //     res.status(200).json(docs);
    // });

    if(count > maxCount) {
        res
            .status(400)
            .json({
                "message" : "Count limit of " + maxCount + " exceeded"
            });

        return;
    }
    // Mongoose with model
    Hotel.find().skip(offset).limit(count).exec(function(err, hotels) {
        if(err) {
            console.log(err);
            res
                .status(500) // 500 is internal service error
                .json(err);
        } else {
            console.log('Found hotels', hotels.length);
            res.status(200).json(hotels);
        }
    });
}

module.exports.hotelsGetOne = function(req, res) {
    // Native driver
    // var db = dbconn.get();
    // var collection = db.db().collection(collectionName);

    var hotelId = req.params.hotelId;
    var thisHotel = hotelData[hotelId];
    console.log('GET hotelId ', hotelId);
    
    // Native driver
    // collection
    // .findOne({
    //     _id: ObjectId(hotelId)
    // }, function(err, doc) {
    //     res
    //     .status(200)
    //     .json(doc);
    // });

    Hotel.findById(hotelId).exec(function(err, hotel) {
        var response = {
            status: 200,
            message: hotel
        };
        if(err) {
            console.log(err);
            response.status = 500;
            response.message = err;
        } else if(!hotel) {
            response.status = 404;
            response.message = {
                "message" : "Hotel ID not found"
            };
        } 
        res
            .status(response.status)
            .json(response.message);
    });
    
}

var _splitArray = function(input) {
    var output;
    if(input && input.length > 0) {
        output = input.split(";");
    } else {
        output = [];
    }
    return output;
}

module.exports.hotelsAddOne = function(req, res) {
    Hotel
        .create({
            name: req.body.name,
            description: req.body.description,
            stars: parseInt(req.body.stars, 10),
            services: _splitArray(req.body.services),
            photos: _splitArray(req.body.photos),
            currency: req.body.currency,
            location: {
                address: req.body.address,
                coordinates: [
                    parseFloat(req.body.lng), 
                    parseFloat(req.body.lat)
                ]
            }
        }, function(err, hotel){
            if(err) {
                console.log("Error creating hotel");
                res
                    .status(400)
                    .json(err);
            } else {
                console.log("Hotel created ", hotel);
                res
                    .status(201)
                    .json(hotel);
            }
        });
}

module.exports.hotelsUpdateOne = function(req, res) {
    var hotelId = req.params.hotelId;
    var thisHotel = hotelData[hotelId];
    console.log('GET hotelId ', hotelId);
    
    Hotel
    .findById(hotelId)
    .select('-reviews -rooms')  // exclude reviews, rooms
    .exec(function(err, hotel) {
        // Step 1: find the hotel
        var response = {
            status: 200,
            message: hotel
        };
        if(err) {
            console.log(err);
            response.status = 500;
            response.message = err;
        } else if(!hotel) {
            response.status = 404;
            response.message = {
                "message" : "Hotel ID not found"
            };
        } 
        if(response.status !== 200) {
            res
            .status(response.status)
            .json(response.message);
        } else {
            // Step 2: update the hotel
            hotel.name = req.body.name;
            hotel.description = req.body.description;
            hotel.stats = parseInt(req.body.stars,10);
            hotel.services = _splitArray(req.body.services);
            hotel.photos = _splitArray(req.body.photos);
            hotel.currency = req.body.currency;
            hotel.location = {
                address: req.body.address,
                coordinates : [
                    parseFloat(req.body.lng),
                    parseFloat(req.body.lat)
                ]
            };

            //Step 3: Save back to db
            hotel.save(function (err, hotelUpdated) {
                if(err) {
                    res
                        .status(500)
                        .json(err);
                } else {
                    // Step 4: generate the response
                    res
                        .status(204) //The server successfully processed the request and is not returning any content
                        .json();
                }
            });
        }
    });
}