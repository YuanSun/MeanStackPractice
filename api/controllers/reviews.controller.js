var collectionName = 'meanhotel';

var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');

module.exports.reviewsGetAll = function (req, res) {
    var hotelId = req.params.hotelId;
    console.log('GET hotelId ', hotelId);

    Hotel.findById(hotelId)
    .select('reviews') // only pick review doc, instead of all info of the hotel
    .exec(function(err, hotel) {
        if(err) {
            console.log(err);
            res.json(err);
        } else {
            console.log("Returned hotel review", hotel);
           res.status(200)
            .json(hotel.reviews);
        }
    });
};

module.exports.reviewsGetOne = function (req, res) {
    var hotelId = req.params.hotelId;
    var reviewId = req.params.reviewId;
    console.log("GET reviewId " + reviewId + " for hotelId " + hotelId);

    Hotel.findById(hotelId)
    .select('reviews') // only pick review doc, instead of all info of the hotel
    .exec(function(err, hotel) {
        var review = hotel.reviews.id(reviewId);
        if(err) {
            console.log(err);
            res.json(err);
        } else {
            console.log("Returned hotel review", hotel);
           res.status(200)
            .json(review);
        }
    });
};

var _addReview = function(req, res, hotel) {
    hotel.reviews.push({
        name : req.body.name,
        rating: parseInt(req.body.rating, 10),
        review: req.body.review
    });
    hotel.save(function(err, hotelUpdated) {
        if(err) {
            res
                .status(500)
                .json(err);
        } else {
            res
                .status(201)
                .json(hotelUpdated.reviews[hotelUpdated.reviews.length - 1]);
        }
    });
};

module.exports.reviewsAddOne = function(req, res) {
    var hotelId = req.params.hotelId;
    console.log('GET hotelId ', hotelId);

    Hotel.findById(hotelId)
    .select('reviews') // only pick review doc, instead of all info of the hotel
    .exec(function(err, hotel) {
        var response =  {
            status: 200,
            message: []
        };
        if(err) {
            console.log("Error finding hotel");
            response.status = 500;
            response.message = err;
        } else if (!hotel) {
            console.log("Hotel id not found in database", id);
            response.status = 404;
            response.message = {
                "message" : "Hotel ID not found " + id
            };
        } else {
            response.message = hotel.reviews? hotel.reviews : [];
        }
        if(hotel) {
            _addReview(req, res, hotel);
        } else {
            res
            .status(response.status)
            .json(response.message);
        }
    });
}