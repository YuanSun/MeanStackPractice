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