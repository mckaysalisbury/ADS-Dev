/* jshint -W117, -W030, -W074, -W106 */
(function () {
    'use strict';

    angular
        .module('app.products')
        .controller('ProductsController', ProductsController);

    ProductsController.$inject =
        ['$http', 'logger', '$location', '$stateParams',
            'searchformservice', '$state', '$scope', 'common', '$q', '$rootScope'];
    /* @ngInject */
    function ProductsController($http, logger, $location, $stateParams, searchformservice,
            $state, $scope, common, $q, $rootScope) {
        $rootScope.$on('$stateChangeStart',
            function(event, toState, toParams, fromState, fromParams) {
                if (fromState.url === 'products') {
                    if (vm.cancelWith) {
                        vm.cancelWith.resolve();
                    }
                    if (vm.cancelWithout) {
                        vm.cancelWithout.resolve();
                    }
                }
            });

        var vm = this;

        vm.editSearch = function editSearch() {
            searchformservice.purpose = vm.purpose;
            searchformservice.ingredient = vm.ingredient;
            $state.go('^.search-by-purpose');
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
        vm.boldTextMatchingPurpose = function boldTextMatchingPurpose(text) {
            if (!text) {
                return '';
            }
            return text.replace(new RegExp(vm.purposeClean(), 'gi'), '<strong>$&</strong>');
        };
        function setWithIngredientGrid() {
            var lastPiece = searchformservice.query;
            if (!lastPiece || lastPiece.indexOf('Without') === -1) {
                vm.gridOptionsWith = { filterText: '' };
                return;
            }
            setIngredientGrid(decodeURIComponent(lastPiece.replace('Without', 'With')), 'With');
        }
        function setWithoutIngredientGrid() {
            var lastPiece = searchformservice.query;
            setIngredientGrid(decodeURIComponent(lastPiece), 'Without');
        }
        function setIngredientGrid(baseUrl, propertySuffix) {
            vm['filterOptions' + propertySuffix] = { filterText: '' };

            var pagingOptions = {
                // pageSizes: [100],
                pageSize: 100,
                currentPage: 1,
            };

            vm['rangeDisplay' + propertySuffix] = function() {
                var offset = (pagingOptions.currentPage - 1) * pagingOptions.pageSize;
                var resultsCount = 0;
                if (vm['results' + propertySuffix])
                {
                    resultsCount = vm['results' + propertySuffix].length;
                }
                return (offset + 1) + ' - ' + (offset + resultsCount);
            };
            vm['pagingOptions' + propertySuffix] = pagingOptions;

            var getData = function() {
                if (vm['cancel' + propertySuffix]) {
                    vm['cancel' + propertySuffix].resolve();
                }
                vm['cancel' + propertySuffix] = $q.defer();
                var url = baseUrl + '/' + pagingOptions.currentPage + '/' + pagingOptions.pageSize;
                $http.get(url, {timeout: vm['cancel' + propertySuffix].promise}).success(function (response) {
                    vm['meta' + propertySuffix] = response.meta;
                    vm['results' + propertySuffix] = insertContextualPurpose(response.results);
                    var totalItems = 0;
                    if (response.meta && response.meta.results)
                    {
                        totalItems = response.meta.results.total;
                    }
                    vm['totalServerItems' + propertySuffix] = totalItems;
                });
            };
            getData();

            $scope.$watch('vm.pagingOptions' + propertySuffix, function(newVal, oldVal) {
                // getData();
                if (oldVal !== newVal && oldVal.currentPage !== newVal.currentPage)
                {
                    getData();
                }
            }, true);

            vm['gridOptions' + propertySuffix] = {
                data : 'vm.results' + propertySuffix,
                columnDefs: [
                    {field: 'brand_name', displayName: 'Product Name'},
                    {field: 'manufacturer_name', displayName: 'Manufacturer'},
                    {
                        field: 'purpose_context',
                        displayName: 'Purpose',
                        cellTemplate: '<div class="ngCellText" ng-bind-html=' +
                            '"vm.boldTextMatchingPurpose(row.getProperty(col.field))"></div>'
                    },
                    {field: 'generic_name', displayName: 'Active Ingredients'},
                ],
                multiSelect: false,
                selectedItems: [],
                afterSelectionChange: function(i, e) {
                    searchformservice.id = i.entity.id;
                    $state.go('^.product');
                    return true;
                },

                filterOptions: vm['filterOptions' + propertySuffix],
                sortInfo: {fields: ['manufacturer_name', 'brand_name'], directions: ['asc', 'asc']},

                // Paging Options
                enablePaging: true,
                showFooter: true,
                pagingOptions: vm['pagingOptions' + propertySuffix],
                totalServerItems: 'vm.totalServerItems' + propertySuffix,
            };
        }

        function insertContextualPurpose(results) {
            var purpose = common.unsanitize(vm.purpose);
            if (results) {
                for (var i = 0; i < results.length; i++) {
                    var example = common.getExample(purpose, results[i].purpose).example;
                    if (example) {
                        results[i].purpose_context = example;
                    }
                    else {
                        results[i].purpose_context = results[i].purpose;
                    }
                }
            }
            return results;
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
