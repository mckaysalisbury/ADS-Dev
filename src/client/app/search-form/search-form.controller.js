/* jshint -W117, -W030, -W074 */
(function () {
    'use strict';

    angular
        .module('app.search-form')
        .controller('SearchFormController', SearchFormController);

    SearchFormController.$inject = ['$state', '$scope', 'searchformservice'];
    /* @ngInject */
    function SearchFormController($state, $scope, searchformservice) {
        var vm = this;
        $state.go('search-form.search-by-purpose');
        $scope.canGoToProducts = function() {
            return searchformservice.query ? true : false;
        };
        $scope.canGoToProduct = function() {
            return searchformservice.id ? true : false;
        };
    }
})();
