/* jshint -W117, -W030, -W074, -W106 */
(function () {
    'use strict';

    angular
        .module('app.products')
        .controller('ProductsController', ProductsController);

    ProductsController.$inject =
    ['$http', 'logger', '$location', '$stateParams',
        'searchformservice', '$state', '$scope', 'common', '$q', '$rootScope', '$window'];
    // Override too many paramaters since all paramters are injected so no direct call is ever necessary
    /* jshint -W072 */
    /* @ngInject */
    function ProductsController($http, logger, $location, $stateParams, searchformservice,
        $state, $scope, common, $q, $rootScope, $window) {
        /* jshint +W072 */
        $rootScope.$on('$stateChangeStart',
            function (event, toState, toParams, fromState, fromParams) {
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

        var allColumns = [
                    { field: 'brand_name', displayName: 'Product Name' },
                    { field: 'manufacturer_name', displayName: 'Manufacturer' },
                    {
                        field: 'purpose_context',
                        displayName: 'Purpose',
                        cellTemplate: '<div class="ngCellText" ng-bind-html=' +
                        '"vm.boldTextMatchingPurpose(row.getProperty(col.field))"></div>'
                    },
                    { field: 'generic_name', displayName: 'Active Ingredients' },
                ];
        var limitedColumns = [{ field: 'brand_name', displayName: 'Product Name' },
                    { field: 'manufacturer_name', displayName: 'Manufacturer' }];
        vm.gridColumns = allColumns;

        $scope.$watch(function () { return angular.element($window).width(); }, function (newValue, oldValue) {
            if (newValue && newValue < 700) {
                vm.gridColumns = limitedColumns;
            }
            else {
                vm.gridColumns = allColumns;
            }
        });

        vm.editSearch = function editSearch() {
            searchformservice.purpose = vm.purpose;
            searchformservice.ingredient = vm.ingredient;
            $state.go('search-by-purpose');
            window.scrollTo(0, 0);
        };
        setWithoutIngredientGrid();
        setWithIngredientGrid();

        vm.ingredientClean = function ingredientClean() {
            if (!vm.ingredient) {
                return '';
            }
            return vm.ingredient;
        };
        vm.purposeClean = function purposeClean() {
            if (!vm.purpose) {
                return '';
            }
            return vm.purpose;
        };
        vm.boldTextMatchingPurpose = function boldTextMatchingPurpose(text) {
            if (!text) {
                return '';
            }
            return common.escapeHtml(text).replace(new RegExp(vm.purposeClean(), 'gi'), '<strong>$&</strong>');
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

            vm['rangeDisplay' + propertySuffix] = function () {
                var currentlyDisplayed = vm['gridOptions' + propertySuffix].ngGrid.filteredRows.length;
                // grid.renderContainers.body.visibleRowCache.length;
                return currentlyDisplayed + ' of ' + vm['totalServerItems' + propertySuffix];
            };
            vm['pagingOptions' + propertySuffix] = pagingOptions;

            var getData = function () {
                if (vm['cancel' + propertySuffix]) {
                    vm['cancel' + propertySuffix].resolve();
                }
                vm['cancel' + propertySuffix] = $q.defer();
                var url = baseUrl + '/' + pagingOptions.currentPage + '/' + pagingOptions.pageSize;
                $http.get(url, { timeout: vm['cancel' + propertySuffix].promise }).success(function (response) {
                    vm['meta' + propertySuffix] = response.meta;
                    vm['results' + propertySuffix] = insertContextualPurpose(response.results);
                    var totalItems = 0;
                    if (response.meta && response.meta.results) {
                        totalItems = response.meta.results.total;
                    }
                    vm['totalServerItems' + propertySuffix] = totalItems;
                    setPurposeAndIngredient(response.meta.query);
                });
            };
            getData();

            $scope.$watch('vm.pagingOptions' + propertySuffix, function (newVal, oldVal) {
                // getData();
                if (oldVal !== newVal && oldVal.currentPage !== newVal.currentPage) {
                    getData();
                }
            }, true);

            vm['gridOptions' + propertySuffix] = {
                data: 'vm.results' + propertySuffix,
                columnDefs: 'vm.gridColumns',
                multiSelect: false,
                selectedItems: [],
                afterSelectionChange: function (i, e) {
                    searchformservice.id = i.entity.id;
                    $state.go('product');
                    window.scrollTo(0, 0);
                    return true;
                },

                filterOptions: vm['filterOptions' + propertySuffix],
                sortInfo: { fields: ['manufacturer_name', 'brand_name'], directions: ['asc', 'asc'] },

                // Paging Options
                enablePaging: true,
                showFooter: true,
                pagingOptions: vm['pagingOptions' + propertySuffix],
                totalServerItems: 'vm.totalServerItems' + propertySuffix,
            };
        }

        function insertContextualPurpose(results) {
            if (results) {
                for (var i = 0; i < results.length; i++) {
                    var example = common.getExample(vm.purpose, results[i].purpose).example;
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

        function setPurposeAndIngredient(query) {
            vm.hasIngredient = false;
            if (!query) {
                return;
            }
            if (query['0']) {
                vm.purpose = query['0'];
            }
            else {
                vm.query = '';
            }

            if (query['1']) {
                vm.hasIngredient = true;
                vm.ingredient = query['1'];
            }
            else {
                vm.ingredient = '';
            }
        }

        $scope.$watch('vm.selectedIndex', function (current, old) {
            switch (current) {
                case 0: $state.go('products.without'); break;
                case 1: $state.go('products.with'); break;
            }
        });
    }
})();
