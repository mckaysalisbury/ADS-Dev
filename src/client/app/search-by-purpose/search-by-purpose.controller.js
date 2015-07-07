/// <reference path="../../../../typings/angularjs/angular.d.ts"/>
/// <reference path="../../../../typings/jquery/jquery.d.ts"/>
(function () {
    'use strict';

    angular
        .module('app.search-by-purpose')
        .controller('SearchByPurposeController', SearchByPurposeController);

    SearchByPurposeController.$inject = ['$http', '$location', '$window',
        '$state', 'logger', 'searchformservice', 'common', '$scope', '$q'];

    /* @ngInject */
    function SearchByPurposeController($http, $location, $window, $state,
        logger, searchformservice, common, $scope, $q) {
        var vm = this;
        vm.purposes = searchformservice.getPurposes();
        vm.ingredients = searchformservice.getIngredients();
        vm.query = query;
        vm.searchResults = [];
        vm.selectedItemChange = selectedItemChange;

        vm.checkChipAdd = function(event, prefix) {
            vm[prefix + 'Text'] = vm[prefix + 'Text'].trim();
            if ((event.key === 'Tab' || event.key === ' ') && vm[prefix + 'Text']) {
                var chip = createChip(vm[prefix + 'Text']);
                vm[prefix + 'Text'] = '';
                vm[prefix + 's'].push(chip);
            }
        };
        vm.addChip = function (chip) {
            if (chip.value) {
                chip = chip.value;
            }
            vm.selectedPurpose = '';
            vm.selectedIngredient = '';
            return createChip(chip);
        };

        function selectedItemChange(item) {
            // Fixes bug in AM where a user select a chip
            // from the collection, adds it to the chips and tries to delete it
            // by pressing backspace.
            vm.selectedItem = undefined;
        }

        $scope.$watch(function () {
            return vm.purposes.length;
        }, refreshProductCount);

        $scope.$watch(function () {
            return vm.ingredients.length;
        }, refreshProductCount);

        function refreshProductCount() {
            vm.productCount = 0;
            vm.searchPurposeWithoutIngredient();
        }

        function createChip(chip) {
            var newChip = { name: '' };
            if (chip.value) {
                newChip.name = chip.value;
            }
            else {
                newChip.name = chip;
            }
            return newChip;
        }

        function query(queryText, chipType) {
            var results = queryText ? vm.searchResults.filter(createFilterFor(queryText)) : vm.searchResults, deferred;
            if (!deferred) {
                deferred = $q.defer();
                var baseUrl;
                var transform;
                if (chipType === 'purpose') {
                    baseUrl = '/data/purpose/';
                    transform = vm.transformPurpose;
                }
                else {
                    baseUrl = '/data/ingredient/';
                    transform = vm.transformIngredient;
                }
                $http.get(baseUrl + common.sanitize(queryText),
                    { timeout: deferred.promise })
                    .success(function (response) {
                        deferred.resolve(transform(response));
                    });
                return deferred.promise;
            }
            else {
                return results;
            }
        }

        /**
         * Create filter function for a query string
         */
        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);

            return function filterFn(item) {
                return (item.value.indexOf(lowercaseQuery) === 0);
            };
        }

        vm.searchPurposeWithoutIngredient = function () {
            if (vm.purposeWithoutIngredientCancel) {
                vm.purposeWithoutIngredientCancel.resolve();
            }
            vm.purposeWithoutIngredientCancel = $q.defer();
            var url = buildHttpQuery();
            $http.get(url,
                { timeout: vm.purposeWithoutIngredientCancel.promise })
                .success(function (response) {
                    if (response.meta && response.meta.results) {
                        vm.productCount = response.meta.results.total;
                    }
                    else {
                        vm.productCount = 0;
                    }
                });
        };

        function buildHttpQuery() {
            var url;
            if (vm.ingredients.length === 0) {
                var parameters = [];
                angular.forEach(vm.purposes, function (value, key) {
                    parameters.push(value.name);
                });
                url = '/data/purpose/' + common.sanitizeAndCombine(parameters);
                return url;
            }
            else {
                var productParameters = [];
                var ingredientParameters = [];
                angular.forEach(vm.purposes, function (value, key) {
                    productParameters.push(value.name);
                });
                angular.forEach(vm.ingredients, function (value, key) {
                    ingredientParameters.push(value.name);
                });
                url = '/data/purposeWithoutIngredient/' + common.sanitizeAndCombine(productParameters) +
                    '/' + common.sanitizeAndCombine(ingredientParameters);
                return url;
            }
        }

        vm.transformPurpose = function (data) {
            return common.getExampleDistinct(data.meta.query[0],
                data.results,
                ['purpose']);
        };
        vm.transformIngredient = function (data) {
            return common.getExampleDistinct(data.meta.query[0],
                data.results,
                ['generic_name', 'inactive_ingredient']);
        };

        vm.viewResults = function viewResults() {
            searchformservice.query = buildHttpQuery();
            searchformservice.purpose = vm.purposes;
            searchformservice.ingredient = vm.ingredients;
            $state.go('products');
            window.scrollTo(0, 0);
        };
    }
})();
