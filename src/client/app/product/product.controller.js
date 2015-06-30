/* jshint -W117, -W030, -W074 */
(function () {
    'use strict';

    angular
        .module('app.product')
        .controller('ProductController', ProductController);

    ProductController.$inject = ['$http', 'searchformservice'];
    /* @ngInject */
    function ProductController($http, searchformservice) {
        var vm = this;
        vm.url = '/data/product/' + searchformservice.id;
        vm.getStringFromArray = function(array) {
            if (array) {
                return array.join('<br />');
            }
            return '';
        };
        $http.get(vm.url).success(function (response) {
            if (response.results) {
                vm.result = response.results[0];
                vm.meta = response.meta;
            }
        });
    }
})();
