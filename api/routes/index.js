var express = require('express');
var ctrlHotels = require('../controllers/hotels.controllers');
var ctrlReviews = require('../controllers/reviews.controller');
var router = express.Router();

router
    .route('/hotels')
    .get(ctrlHotels.hotelsGetAll);

router
    .route('/hotels/:hotelId')
    .get(ctrlHotels.hotelsGetOne);

router
    .route('/hotels/new')
    .post(ctrlHotels.hotelsAddOne);

// review routes
router
    .route('/hotels/:hotelId/reviews')
    .get(ctrlReviews.reviewsGetAll);

router
    .route('/hotels/:hotelId/reviews/:reviewId')
    .get(ctrlReviews.reviewsGetOne);


module.exports = router;


// db.tech.insert([
//     {
//         name: "Angular",
//         role: "Font-end framework"
//     },
//     {
//         name: "Node.js",
//         role: "Platform"
//     }
// ]
// )