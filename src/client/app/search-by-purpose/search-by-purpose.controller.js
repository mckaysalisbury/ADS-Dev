/// <reference path="../../../../typings/angularjs/angular.d.ts"/>
/// <reference path="../../../../typings/jquery/jquery.d.ts"/>
(function () {
    'use strict';

    angular
        .module('app.search-by-purpose')
        .controller('SearchByPurposeController', SearchByPurposeController);

    SearchByPurposeController.$inject = ['$http', '$location', '$window',
        '$state', 'logger', 'searchformservice', 'common', '$q'];

    /* @ngInject */
    function SearchByPurposeController($http, $location, $window, $state,
        logger, searchformservice, common, $q) {
        var vm = this;

        vm.searchPurposeWithoutIngredient = function () {
            if (!vm.purpose) {
                vm.productCount = 0;
            }
            else {
                if (vm.purposeWithoutIngredientCancel) {
                    vm.purposeWithoutIngredientCancel.resolve();
                }
                vm.purposeWithoutIngredientCancel = $q.defer();
                $http.get(getPurposeWithoutIngredientQuery(),
                        {timeout: vm.purposeWithoutIngredientCancel.promise})
                    .success(function (response) {
                    if (response.meta && response.meta.results) {
                        vm.productCount = response.meta.results.total;
                    }
                });
            }
        };

        var nullOrEmpty = function(item) {
            return item === null || item === '';
        };

        vm.provideExamplePurposes = function () {
            if (nullOrEmpty(vm.purpose)) {
                vm.examplePurposes = [];
            }
            else {
                if (vm.purposeCancel) {
                    vm.purposeCancel.resolve();
                }
                vm.purposeCancel = $q.defer();
                $http.get('/data/purpose/' + common.sanitize(vm.purpose),
                        {timeout: vm.purposeCancel.promise})
                    .success(function (response) { vm.examplePurposes = vm.transformPurpose(response); });
            }
            vm.searchPurposeWithoutIngredient();
        };
        vm.provideExampleIngredients = function () {
            if (nullOrEmpty(vm.ingredient)) {
                vm.exampleIngredients = [];
            }
            else {
                if (vm.ingredientCancel) {
                    vm.ingredientCancel.resolve();
                }
                vm.ingredientCancel = $q.defer();
                $http.get('/data/ingredient/' + common.sanitize(vm.ingredient),
                        {timeout: vm.ingredientCancel.promise})
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
        vm.changePurpose = function changePurpose(newValue) {
            vm.purpose = newValue;
            vm.provideExamplePurposes();
        };
        vm.changeIngredient = function changeIngredient(newValue) {
            vm.ingredient = newValue;
            vm.provideExampleIngredients();
        };
        function getPurposeWithoutIngredientQuery() {
            if (!vm.ingredient || vm.ingredient === '') {
                return '/data/purpose/' + common.sanitize(vm.purpose);
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
            vm.purpose = searchformservice.purpose;
            vm.ingredient = searchformservice.ingredient;
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
