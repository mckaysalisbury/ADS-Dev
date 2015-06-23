/* jshint -W117, -W030, -W074 */
(function () {
    'use strict';

    angular
        .module('app.products')
        .controller('ProductsController', ProductsController);

    ProductsController.$inject = ['$http'];
    /* @ngInject */
    function ProductsController($http) {
        var vm = this;
        var splitByEquals = document.location.search.split('=');
        // I could check for "query" here
        var lastPiece = splitByEquals[splitByEquals.length - 1];
        vm.url = lastPiece;
        $http.get(vm.url).success(function (response) {
            vm.result = response.results[0];
        });
    }
})();
