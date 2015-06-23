/* jshint -W117, -W030, -W074, -W106 */
(function () {
    'use strict';

    angular
        .module('app.products')
        .controller('ProductsController', ProductsController);

    ProductsController.$inject = ['$http', 'logger', '$location'];
    /* @ngInject */
    function ProductsController($http, logger, $location) {
        var vm = this;
        vm.filterOptions = { filterText: '' }; 

        var splitByEquals = document.location.search.split('=');
        // I could check for "query" here
        var lastPiece = splitByEquals[splitByEquals.length - 1];
        vm.url = decodeURIComponent(lastPiece);
        $http.get(vm.url).success(function (response) {
            vm.results = response.results;
        });

        vm.gridOptions = {
            data : 'vm.results',
            columnDefs: [
                {field: 'brand_name', displayName: 'Product Name'},
                {field: 'manufacturer_name', displayName: 'Manufacturer'},
                {field: 'purpose', displayName: 'Purpose'},
                {field: 'generic_name', displayName: 'Active Ingredients'},
            ],
            multiSelect: false,
            selectedItems: [],
            afterSelectionChange: function(i, e) {
                $location.path('/product');
                $location.search('id', i.entity.id);
                return true;
            },
            filterOptions: vm.filterOptions
        };
    }
})();
