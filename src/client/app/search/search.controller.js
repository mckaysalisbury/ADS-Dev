(function () {
    'use strict';

    angular
        .module('app.search')
        .controller('SearchController', SearchController);



    SearchController.$inject = ['$http', '$scope'];
    /* @ngInject */
    function SearchController($http, $scope) {
        var vm = this;

        vm.gridOptions = { data: 'vm.names' };
        $http.get('/data/substances')
            .success(function (response) {
            vm.names = response.results;

        });
        vm.doSearch = function (evt) {
            $http.get("/data/drugsContaining/" + vm.ingredient)
                .success(function (response) { vm.drugsContaining = response.results; });
        };
    }
})();
