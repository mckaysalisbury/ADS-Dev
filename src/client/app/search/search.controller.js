/* jshint -W117, -W030, -W074 */
(function () {
    'use strict';

    angular
        .module('app.search')
        .controller('SearchController', SearchController);

    SearchController.$inject = ['$http'];
    /* @ngInject */
    function SearchController($http) {
        var vm = this;
        vm.filterOptions = { filterText: '', };

        vm.havingIngredientsGrid = { data: 'vm.drugsContaining',
                                     filterOptions: vm.filterOptions };

        vm.filterNephi = function () {
            var filterText = 'name:Nephi';
            if (vm.filterOptions.filterText === '') {
                vm.filterOptions.filterText = filterText;
            }
            else if (vm.filterOptions.filterText === filterText) {
                vm.filterOptions.filterText = '';
            }
        };

        vm.searchPurposeWithoutIngredient = function (evt) {
            $http.get('/data/purposeWithoutIngredient/' + vm.purpose + '/' + vm.excludeIngredient)
                .success(function (response) { vm.productsWithoutIngredient = response.results; });
        };
        
        vm.provideExamplePurposes = function (evt) {
            console.log('purpose: ' + vm.purpose);
            $http.get('/data/purposeWithQuery/' + vm.purpose)
                .success(function (response) { vm.examplePurposes = vm.transformPurpose(response); });  
            vm.searchPurposeWithoutIngredient(evt);          
        };

        vm.productSearch = function(evt) {
            $http.get('/data/products/' + vm.productName)
                 .success(function (response) {vm.products = response.results;});
        };

        vm.gridOptions = { data: 'vm.products', filterOptions: vm.filterOptions,
            enablePaging: true
        //pagingOptions: $scope.pagingOptions,
             };
    }
})();
