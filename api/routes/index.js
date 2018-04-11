var express = require('express');
var ctrlHotels = require('../controllers/hotels.controllers');
var ctrlReviews = require('../controllers/reviews.controller');
var router = express.Router();

router
    .route('/hotels')
    .get(ctrlHotels.hotelsGetAll)
    .post(ctrlHotels.hotelsAddOne);

router
    .route('/hotels/:hotelId')
    .get(ctrlHotels.hotelsGetOne)
    .put(ctrlHotels.hotelsUpdateOne)
    .delete(ctrlHotels.hotelsDeleteOne);
    
// review routes
router
    .route('/hotels/:hotelId/reviews')
    .get(ctrlReviews.reviewsGetAll)
    .post(ctrlReviews.reviewsAddOne);

router
    .route('/hotels/:hotelId/reviews/:reviewId')
    .get(ctrlReviews.reviewsGetOne)
    .put(ctrlReviews.reviewsUpdateOne)
    .delete(ctrlReviews.reviewsDeleteOne);


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