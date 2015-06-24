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

        var lastPiece = getQuery();
        vm.url = decodeURIComponent(lastPiece);
        $http.get(vm.url).success(function (response) {
            vm.meta = response.meta;
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
            filterOptions: vm.filterOptions,
            sortInfo: {fields: ['manufacturer_name', 'brand_name'], directions: ['asc', 'asc']}
        };
        vm.editSearch = function editSearch() {
            $location.path('/');
            $location.search('query', null);
            $location.search('purpose', vm.purpose);
            $location.search('ingredient', vm.ingredient);
        };
        setPurposeAndIngredient();

        function setPurposeAndIngredient() {
            var query = getQuery();
            var splitBySlash = query.split('/');
            if (splitBySlash.length > 4) {
                vm.ingredient = splitBySlash[4];
            }
            else {
                vm.ingredient = '';
            }
            if (splitBySlash.length > 3) {
                vm.purpose = splitBySlash[3];
            }
            else {
                vm.purpose = '';
            }
        }
        function getQuery() {
            var searchObject = $location.search();
            return searchObject.query;
        }
    }
})();
