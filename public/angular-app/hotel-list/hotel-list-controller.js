angular.module('meanhotel').controller('HotelsController', HotelsController);

function HotelsController(hotelDataFactory){
    var vm = this;
    vm.title = 'MEAN Hotel App';

    hotelDataFactory.hotelList().then(function(response) {
        // console.log("Here is HotelsController");
        // console.log(response);
        vm.hotels = response;

    });
}