/* jshint -W117, -W043 */
/// <reference path="../../../../typings/angularjs/angular.d.ts"/>
/// <reference path="../../../../typings/jquery/jquery.d.ts"/>
(function () {
    'use strict';

    angular
        .module('app.search-by-purpose')
        .controller('SearchByPurposeController', SearchByPurposeController);

    SearchByPurposeController.$inject = ['$http', '$location', '$window',
        '$state', 'logger', 'searchformservice', 'common', '$q', '$timeout'];

    /* @ngInject */
    function SearchByPurposeController($http, $location, $window, $state,
        logger, searchformservice, common, $q, $timeout) {
        var vm = this;

        vm.simulateQuery = true;
        vm.isDisabled = false;
        vm.purposes = [];
        vm.noCache = true;
        vm.querySearch = querySearch;
        vm.selectedItemChange = selectedItemChange;
        vm.searchTextChange = searchTextChange;
        vm.examplePurposes = [];
        vm.newPurpose = function (chip) {
            var newPurpose = { name: '' };
            if (chip.value != null) {
                newPurpose.name = chip.value;
            }
            else {
                newPurpose.name = chip;
            }
            vm.searchPurposeWithoutIngredient(newPurpose);
            return newPurpose;
        };
        
        function querySearch(query) {
            var results = query ? vm.examplePurposes.filter(createFilterFor(query)) : vm.examplePurposes,
                deferred;
            if (vm.simulateQuery) {
                deferred = $q.defer();
                $http.get('/data/purpose/' + query,
                    { timeout: deferred.promise })
                    .success(function (response) {
                    vm.examplePurposes = vm.transformPurpose(response);
                    deferred.resolve(vm.examplePurposes);
                });
                return deferred.promise;
            } else {
                return results;
            }
        }
        function searchTextChange(text) {
            logger.info('Text changed to ' + text);
        }

        function selectedItemChange(item) {
            logger.info('Item changed to ' + JSON.stringify(item));
        }
        /**
         * Create filter function for a query string
         */
        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);

            return function filterFn(purpose) {
                return (purpose.value.indexOf(lowercaseQuery) === 0);
            };
        }

        vm.searchPurposeWithoutIngredient = function (newPurpose) {
            logger.info('searchpurposewithout');
            if (vm.purposeWithoutIngredientCancel) {
                vm.purposeWithoutIngredientCancel.resolve();
            }
            vm.purposeWithoutIngredientCancel = $q.defer();
            var url = getPurposeWithoutIngredientQuery(newPurpose);
            logger.info('url : ' + url);
            $http.get(url,
                { timeout: vm.purposeWithoutIngredientCancel.promise })
                .success(function (response) {
                if (response.meta && response.meta.results) {
                    logger.info('success');
                    logger.info(response.meta.results.total);
                    vm.productCount = response.meta.results.total;
                }
            });
        };
        vm.provideExamplePurposes = function () {
            if (vm.purpose === null || vm.purpose === '') {
                vm.examplePurposes = [];
            }
            else {
                if (vm.purposeCancel) {
                    vm.purposeCancel.resolve();
                }
                vm.purposeCancel = $q.defer();
                $http.get('/data/purpose/' + common.sanitize(vm.purpose),
                    { timeout: vm.purposeCancel.promise })
                    .success(function (response) { vm.examplePurposes = vm.transformPurpose(response); });
            }
            vm.searchPurposeWithoutIngredient();
        };

        vm.provideExampleIngredients = function () {
            if (vm.ingredient === null || vm.ingredient === '') {
                vm.exampleIngredients = [];
            }
            else {
                if (vm.ingredientCancel) {
                    vm.ingredientCancel.resolve();
                }
                vm.ingredientCancel = $q.defer();
                $http.get('/data/ingredient/' + common.sanitize(vm.ingredient),
                    { timeout: vm.ingredientCancel.promise })
                    .success(function (response) { vm.exampleIngredients = vm.transformIngredient(response); });
            }
            vm.searchPurposeWithoutIngredient();
        };
        vm.viewResults = function viewResults() {
            searchformservice.query = getPurposeWithoutIngredientQuery();
            searchformservice.purpose = vm.purpose;
            searchformservice.ingredient = vm.ingredient;
            $state.go('^.products');
            window.scrollTo(0, 0);
        };
        
        function getPurposeWithoutIngredientQuery(newPurpose) {
            if ((!vm.ingredient || vm.ingredient === '')) {
                var parameters = [];
                angular.forEach(vm.purposes, function (value, key) {
                    parameters.push(value.name);
                });
                if (newPurpose) {
                    parameters.push(newPurpose.name);
                }
                return '/data/purpose/' + common.sanitizeArray(parameters); 
            }
            return '/data/purposeWithoutIngredient/' + common.sanitize(vm.purpose) +
                '/' + common.sanitize(vm.ingredient);
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
        function setInitialValuesFromSearchQuery() {
            vm.purpose = common.unsanitize(searchformservice.purpose);
            vm.ingredient = common.unsanitize(searchformservice.ingredient);
            if (vm.purpose) {
                vm.provideExamplePurposes();
            }
            if (vm.ingredient) {
                vm.provideExampleIngredients();
            }
        }

        setInitialValuesFromSearchQuery();

    }
})();
