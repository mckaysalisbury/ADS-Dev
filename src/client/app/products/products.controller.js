/* jshint -W117, -W030, -W074, -W106 */
(function () {
    'use strict';

    angular
        .module('app.products')
        .controller('ProductsController', ProductsController);

    ProductsController.$inject = ['$http', 'logger', '$location', '$stateParams', 'searchformservice'];
    /* @ngInject */
    function ProductsController($http, logger, $location, $stateParams, searchformservice) {
        var vm = this;
        vm.filterOptions = { filterText: '' };
        var lastPiece = searchformservice.query;
        logger.info(lastPiece);
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
        vm.editSearch = function editSearch() {
            var query = getQuery();
            var splitBySlash = query.split('/');
            var purpose = '';
            var ingredient = '';
            if (splitBySlash.length > 4) {
                ingredient = splitBySlash[4];
            }
            if (splitBySlash.length > 3) {
                purpose = splitBySlash[3];
            }
            $location.path('/');
            $location.search('query', null);
            $location.search('purpose', purpose);
            $location.search('ingredient', ingredient);
        };
        function getQuery() {
            var searchObject = $location.search();
            return searchObject.query;
        }
    }
})();
