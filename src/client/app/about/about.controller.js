/* jshint -W117, -W030, -W074 */
(function () {
    'use strict';

    angular
        .module('app.about')
        .controller('AboutController', AboutController);

    AboutController.$inject = ['$http'];
    /* @ngInject */
    function AboutController($http) {
        var vm = this;
        var splitByEquals = document.location.search.split('=');
        // I could check for "id" here
        var lastPiece = splitByEquals[splitByEquals.length - 1];
        vm.url = '/data/product/' + lastPiece;
        $http.get(vm.url).success(function (response) {
            vm.result = response.results[0];
            vm.meta = response.meta;
        });
    }
})();
