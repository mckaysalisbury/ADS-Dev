/* jshint -W117, -W030, -W074, -W106 */
(function () {
    'use strict';

    angular
        .module('app.products')
        .controller('ProductsController', ProductsController);

    ProductsController.$inject = ['$http', 'logger', '$location', '$scope'];
    /* @ngInject */
    function ProductsController($http, logger, $location, $scope) {
        var vm = this;
        vm.filterOptions = { filterText: '' };

        var lastPiece = getQuery();
        vm.url = decodeURIComponent(lastPiece);

        var refreshData = function() {
            $http.get(vm.url).success(function (response) {
                vm.meta = response.meta;
                vm.results = response.results;
                $scope.totalServerItems = response.meta.results.total;
            });
        };

        refreshData();

        $scope.totalServerItems = -1;

        $scope.pagingOptions = {
            pageSizes: [10, 50, 100],
            pageSize: 100,
            currentPage: 1
        };

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
            sortInfo: {fields: ['manufacturer_name', 'brand_name'], directions: ['asc', 'asc']},

            // Paging Options
            // enablePaging: true,
            // showFooter: true,
            pagingOptions: $scope.pagingOptions,
            totalServerItems: 'totalServerItems',
        };

        $scope.$watch('pagingOptions', function(newVal, oldVal) {
            refreshData();
        });

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
