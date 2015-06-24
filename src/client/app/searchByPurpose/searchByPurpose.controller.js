/// <reference path="../../../../typings/angularjs/angular.d.ts"/>
/// <reference path="../../../../typings/jquery/jquery.d.ts"/>
(function () {
    'use strict';

    angular
        .module('app.searchByPurpose')
        .controller('SearchByPurposeController', SearchByPurposeController);

    SearchByPurposeController.$inject = ['$http', '$location', '$window'];
    /* @ngInject */
    function SearchByPurposeController($http, $location, $window) {
        var vm = this;
        var nonWordCharacters = [' ', '/', ',', ')', '(', '.'];
        /* jshint -W117 */
        var contains = $.inArray;
        /* jshint +W117 */

        vm.searchPurposeWithoutIngredient = function () {
            if (!vm.purpose) {
                vm.productCount = 0;
            }
            else {
                $http.get(getPurposeWithoutIngredientQuery())
                    .success(function (response) { vm.productCount = response.meta.results.total; });
            }            
        };

        vm.provideExamplePurposes = function () {
            if (vm.purpose == null || vm.purpose === '') {
                vm.examplePurposes = [];
            }
            else {
                $http.get('/data/purpose/' + sanitize(vm.purpose))
                    .success(function (response) { vm.examplePurposes = vm.transformPurpose(response); });
            }
            vm.searchPurposeWithoutIngredient();
        };
        vm.provideExampleIngredients = function () {
            if (vm.ingredient == null || vm.ingredient === '') {
                vm.exampleIngredients = [];
            }
            else {
                $http.get('/data/ingredient/' + sanitize(vm.ingredient))
                    .success(function (response) { vm.exampleIngredients = vm.transformIngredient(response); });
            }
            vm.searchPurposeWithoutIngredient();
        };
        vm.getExample = function getExample(query, input) {
            if (query == null || input == null) {
                return {};
            }
            return getExampleSanitized(query, input);
        };
        vm.viewResults = function viewResults() {
            $location.path('/products');
            $location.search('query', getPurposeWithoutIngredientQuery());
            $location.search('purpose', null);
            $location.search('ingredient', null);
            $window.scrollTo(0, 0);
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
                return '/data/purpose/' + sanitize(vm.purpose);
            }
            return '/data/purposeWithoutIngredient/' + sanitize(vm.purpose) + '/' + sanitize(vm.ingredient);
        }
        function sanitize(input) {
            if (!input) {
                return input;
            }
            return input.replace(' ', '+');
        }
        function unsanitize(input) {
            if (!input) {
                return input;
            }
            return input.replace('+', ' ');
        }
        function getExampleSanitized(query, input) {
            var indexOfQuery = input.toLowerCase().indexOf(query.toLowerCase());
            if (indexOfQuery === -1) {
                return {'value': query, 'example': null};
            }
            var fullText = getFullTextFromInput(query, input, indexOfQuery);
            var example = getSampleTextFromInput(query, input, indexOfQuery, fullText.length);
            // console.log({'query': query, 'input': input});
            // console.log({'value': fullText, 'example': example});
            return {'value': fullText.toLowerCase(), 'example': example};
        }
        function getSampleTextFromInput(query, input, indexOfQuery, fullTextLength) {
            var startIndex = indexOfQuery - 25;
            var endIndex = indexOfQuery + 25 + fullTextLength;
            if (startIndex < 0) {
                startIndex = 0;
            }
            else {
                while (startIndex > 0 && contains(input[startIndex - 1], nonWordCharacters) === -1) {
                    startIndex--;
                }
            }
            if (endIndex >= input.length) {
                endIndex = input.length;
            }
            else {
                while (endIndex < input.length && contains(input[endIndex], nonWordCharacters) === -1) {
                    endIndex++;
                }
            }
            return input.substring(startIndex, endIndex);
        }
        function getFullTextFromInput(query, input, indexOfQuery) {
            var i = indexOfQuery + query.length;
            var fullText = query;
            while (input.length > i && contains(input[i], nonWordCharacters) === -1) {
                fullText += input[i++];
            }
            return fullText;
        }

        vm.transformPurpose = function(data) {
            var result = [];
            var query = unsanitize(data.meta.query[0]);
            if (!data.results) {
                return result;
            }
            var alreadyAdded = [];
            data.results.forEach(function(element) {
                var v = vm.getExample(query, element.purpose);
                if (v.example && contains(v.value, alreadyAdded) === -1) {
                    result.push(v);
                    alreadyAdded.push(v.value);
                }
            }, this);
            return result;
        };
        vm.transformIngredient = function(data) {
            var result = [];
            var query = unsanitize(data.meta.query[0]);
            if (!data.results) {
                return result;
            }
            var alreadyAdded = [];
            data.results.forEach(function(element) {
                /* jshint -W106 */ // comes from FDA dataset
                var v = vm.getExample(query, element.generic_name);
                if (v.example && contains(v.value, alreadyAdded) === -1) {
                    result.push(v);
                    alreadyAdded.push(v.value);
                }
                v = vm.getExample(query, element.inactive_ingredient);
                /* jshint +W106 */ // comes from FDA dataset
                if (v.example && contains(v.value, alreadyAdded) === -1) {
                    result.push(v);
                    alreadyAdded.push(v.value);
                }
            }, this);
            return result;
        };
        function setInitialValuesFromSearchQuery() {
            var searchObject = $location.search();
            console.log(searchObject);
            vm.purpose = searchObject.purpose;
            vm.ingredient = searchObject.ingredient;
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
