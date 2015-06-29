/* jshint -W117, -W030, -W074 */
(function () {
    'use strict';

    angular
        .module('app.search-form')
        .controller('SearchFormController', SearchFormController);

    SearchFormController.$inject = ['$state', 'searchformservice'];
    /* @ngInject */
    function SearchFormController($state, searchformservice) {
        var vm = this;
        $state.go('search-form.search-by-purpose');
        vm.canGoToProducts = function() {
            return searchformservice.query ? true : false;
        };
        vm.canGoToProduct = function() {
            return searchformservice.id ? true : false;
        };
    }
})();
