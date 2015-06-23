/* jshint -W117, -W030, -W074 */
(function () {
    'use strict';

    angular
        .module('app.product')
        .controller('ProductController', ProductController);

    ProductController.$inject = ['$http'];
    /* @ngInject */
    function ProductController($http) {
        var vm = this;
        var splitByEquals = document.location.search.split('=');
        // I could check for "id" here
        var lastPiece = splitByEquals[splitByEquals.length - 1];
        vm.url = "/data/product/" + lastPiece;
	    $http.get(vm.url).success(function (response) {
		      vm.result = response.results[0];
        });
        


			// var pieces = document.location.pathname.split("/");
			// $scope.url = "/data/product/" + pieces[pieces.length - 1];
			// $http.get($scope.url).success(function (response) {
			// 	$scope.result = response.results[0];
			// });

    }
})();
