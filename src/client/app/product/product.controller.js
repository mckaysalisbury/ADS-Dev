/* jshint -W117, -W030, -W074 */
(function () {
    'use strict';

    angular
        .module('app.product')
        .controller('ProductController', ProductController);

    ProductController.$inject = ['$http', 'searchformservice', '$state'];
    /* @ngInject */
    function ProductController($http, searchformservice, $state) {
        var vm = this;
        vm.url = '/data/product/' + searchformservice.id;
        vm.getStringFromArray = function(array) {
            if (array) {
                return array.join('<br />');
            }
            return '';
        };
        vm.returnToResults = function() {
            $state.go('^.products');
            window.scrollTo(0, 0);
        };
        $http.get(vm.url).success(function (response) {
            if (response.results) {
                vm.result = response.results[0];
                vm.meta = response.meta;
            }
        });
    }
})();
