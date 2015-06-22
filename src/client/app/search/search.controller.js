(function () {
    'use strict';

    angular
        .module('app.search')
        .controller('SearchController', SearchController);

    SearchController.$inject = ['$http', '$scope'];
    /* @ngInject */
    function SearchController($http, $scope) {
        var vm = this;
        vm.filterOptions = { filterText: '',  };
        vm.gridOptions = { data: 'vm.names', filterOptions: vm.filterOptions };

        vm.havingIngredientsGrid = { data: 'vm.drugsContaining', filterOptions: vm.filterOptions };
        vm.filterNephi = function () {
            var filterText = 'name:Nephi';
            if ($scope.filterOptions.filterText === '') {
                $scope.filterOptions.filterText = filterText;
            }
            else if ($scope.filterOptions.filterText === filterText) {
                $scope.filterOptions.filterText = '';
            }
        };

        $http.get('/data/substances')
            .success(function (response) {
            vm.names = response.results;
        });
        vm.doSearch = function (evt) {
            $http.get('/data/drugsContaining/' + vm.ingredient)
                .success(function (response) { vm.drugsContaining = response.results; });
        };
    }
})();
