angular.module('meanhotel').factory('hotelDataFactory', function($http) {
    return {
        hotelList: function() {
            return $http.get('/api/hotels?count=10').then(complete).catch(failed);
        },
        
        hotelDisplay: function(id) {
            return $http.get('/api/hotels/' + id).then(complete).catch(failed);
        }
        // hotelList : hotelList,
        // hotelDisplay : hotelDisplay
    };
});

// function hotelList() {
//     console.log("Here is in the HotelList");
//     console.log($http);
//     return $http.get('/api/hotels?count=10').then(complete).catch(failed);
// }

// function hotelDisplay(id) {
//     console.log("Here is in the HotelDisplay");
//     console.log($http);
//     return $http.get('/api/hotels/' + id).then(complete).catch(failed);
// }

function complete(response) {
    // console.log("Here is complete response");
    // console.log(response);
    return response.data;
}

function failed(error) {
    console.log(error.statusText);
}