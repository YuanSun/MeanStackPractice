// angular.module('meanhotel').directive('hotelRating', hotelRating);

// function hotelRating() {
//     return {
//         restrict: 'EA', // element and attribute
//         template: '<span ng-repeat="star in vm.stars track by $index">&#9733</span>',
//         bindToController: true,
//         controller: 'HotelController',
//         controllerAs: 'vm',
//         scope: {
//             stars: '@'
//         }
//     }
// }

angular.module('meanhotel').component('hotelRating', { // component implementation starting angualr 1.5
    bindings: {
        stars: '='
    },
    template: '<span ng-repeat="star in vm.stars track by $index">&#9733</span>',
    controller: 'HotelController',
    controllerAs : 'vm'
});