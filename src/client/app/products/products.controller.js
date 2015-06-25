/* jshint -W117, -W030, -W074, -W106 */
(function () {
    'use strict';

    angular
        .module('app.products')
        .controller('ProductsController', ProductsController);

    ProductsController.$inject = ['$http', 'logger', '$location', '$stateParams', 'searchformservice', '$state'];
    /* @ngInject */
    function ProductsController($http, logger, $location, $stateParams, searchformservice, $state) {
        var vm = this;

        vm.editSearch = function editSearch() {
            searchformservice.purpose = vm.purpose;
            searchformservice.ingredient = vm.ingredient;
            $state.go('^.searchByPurpose');
        };
        setWithoutIngredientGrid();
        setWithIngredientGrid();
        setPurposeAndIngredient();

        vm.ingredientClean = function ingredientClean() {
            if (!vm.ingredient) {
                return '';
            }
            return vm.ingredient.split('+').join(' ');
        };
        vm.purposeClean = function purposeClean() {
            if (!vm.purpose) {
                return '';
            }
            return vm.purpose.split('+').join(' ');
        };
        function setWithIngredientGrid() {
            var lastPiece = searchformservice.query;
            if (!lastPiece || lastPiece.indexOf('Without') === -1) {
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
            var lastPiece = searchformservice.query;
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
                vm[resultsProperty] = insertPurposeContext(response.results);
            });

            vm[gridOptionsProperty] = {
                data : 'vm.' + resultsProperty,
                columnDefs: [
                    {field: 'brand_name', displayName: 'Product Name'},
                    {field: 'manufacturer_name', displayName: 'Manufacturer'},
                    {field: 'purpose_context', displayName: 'Purpose'},
                    {field: 'generic_name', displayName: 'Active Ingredients'},
                ],
                multiSelect: false,
                selectedItems: [],
                afterSelectionChange: function(i, e) {
                    searchformservice.id = i.entity.id;
                    $state.go('^.product');
                    return true;
                },
                filterOptions: vm[filterOptionsProperty],
                sortInfo: {fields: ['manufacturer_name', 'brand_name'], directions: ['asc', 'asc']}
            };
        }

        function insertPurposeContext(input) {
            
        }

        function setPurposeAndIngredient() {
            var query = searchformservice.query;
            if (!query) {
                return;
            }
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
    }
})();
