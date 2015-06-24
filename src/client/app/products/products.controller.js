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

        vm.editSearch = function editSearch() {
            $location.path('/');
            $location.search('query', null);
            $location.search('purpose', vm.purpose);
            $location.search('ingredient', vm.ingredient);
        };
        setWithoutIngredientGrid();
        setWithIngredientGrid();
        setPurposeAndIngredient();

        function setWithIngredientGrid() {
            var lastPiece = getQuery();
            if (lastPiece.indexOf('Without') === -1) {
                vm['gridOptionsWith'] = { filterText: '' };
                return;
            }
            setIngredientGrid(decodeURIComponent(lastPiece.replace('Without', 'With')),
                'resultsWith',
                'metaWith',
                'gridOptionsWith',
                'filterOptionsWith');
        }
        function setWithoutIngredientGrid() {
            var lastPiece = getQuery();
            setIngredientGrid(decodeURIComponent(lastPiece),
                'results',
                'meta',
                'gridOptions',
                'filterOptions');
        }
        function setIngredientGrid(url, resultsProperty, metaProperty, gridOptionsProperty, filterOptionsProperty) {
            vm[filterOptionsProperty] = { filterText: '' };

            vm.url = url;
            $http.get(vm.url).success(function (response) {
                vm[metaProperty] = response.meta;
                vm[resultsProperty] = response.results;
            });

            vm[gridOptionsProperty] = {
                data : 'vm.' + resultsProperty,
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
                filterOptions: vm[filterOptionsProperty],
                sortInfo: {fields: ['manufacturer_name', 'brand_name'], directions: ['asc', 'asc']}
            };
        }

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
