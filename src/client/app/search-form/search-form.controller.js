/* jshint -W117, -W030, -W074 */
(function () {
    'use strict';

    angular
        .module('app.search-form')
        .controller('SearchFormController', SearchFormController);

    SearchFormController.$inject = ['$state', '$scope'];
    /* @ngInject */
    function SearchFormController($state, $scope) {
        var vm = this;
        $state.go('search-form.searchByPurpose');
    }
})();
