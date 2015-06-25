/// <reference path="../../../../typings/angularjs/angular.d.ts"/>
/// <reference path="../../../../typings/jquery/jquery.d.ts"/>
(function () {
    'use strict';

    angular
        .module('app.searchByPurpose')
        .controller('SearchByPurposeController', SearchByPurposeController);

    SearchByPurposeController.$inject = ['$http', '$location', '$window',
        '$state', 'logger', 'searchformservice', 'common'];

    /* @ngInject */
    function SearchByPurposeController($http, $location, $window, $state,
        logger, searchformservice, common) {
        var vm = this;

        vm.searchPurposeWithoutIngredient = function () {
            if (!vm.purpose) {
                vm.productCount = 0;
            }
            else {
                $http.get(getPurposeWithoutIngredientQuery())
                    .success(function (response) {
                    if (response.meta && response.meta.results) {
                        vm.productCount = response.meta.results.total;
                    }
                });
            }
        };

        vm.provideExamplePurposes = function () {
            if (vm.purpose == null || vm.purpose === '') {
                vm.examplePurposes = [];
            }
            else {
                $http.get('/data/purpose/' + common.sanitize(vm.purpose))
                    .success(function (response) { vm.examplePurposes = vm.transformPurpose(response); });
            }
            vm.searchPurposeWithoutIngredient();
        };
        vm.provideExampleIngredients = function () {
            if (vm.ingredient == null || vm.ingredient === '') {
                vm.exampleIngredients = [];
            }
            else {
                $http.get('/data/ingredient/' + common.sanitize(vm.ingredient))
                    .success(function (response) { vm.exampleIngredients = vm.transformIngredient(response); });
            }
            vm.searchPurposeWithoutIngredient();
        };
        vm.viewResults = function viewResults() {
            searchformservice.query = getPurposeWithoutIngredientQuery();
            searchformservice.purpose = vm.purpose;
            searchformservice.ingredient = vm.ingredient;
            $state.go('^.products');
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
