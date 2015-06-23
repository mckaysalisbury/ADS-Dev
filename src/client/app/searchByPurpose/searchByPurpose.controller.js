/// <reference path="../../../../typings/angularjs/angular.d.ts"/>
(function () {
    'use strict';

    angular
        .module('app.searchByPurpose')
        .controller('SearchByPurposeController', SearchByPurposeController);

    SearchByPurposeController.$inject = ['$http'];
    /* @ngInject */
    function SearchByPurposeController($http) {
        var vm = this;

        vm.searchPurposeWithoutIngredient = function (evt) {
            $http.get('/data/purposeWithoutIngredient/' + vm.purpose + '/' + vm.ingredient)
                .success(function (response) { vm.productsWithoutIngredient = response.results; });
        };

        vm.provideExamplePurposes = function (evt) {
            $http.get('/data/purpose/' + vm.purpose)
                .success(function (response) { vm.examplePurposes = vm.transformPurpose(response); });
            // vm.searchPurposeWithoutIngredient(evt);
        };
        vm.provideExampleIngredients = function (evt) {
            $http.get('/data/ingredient/' + vm.ingredient)
                .success(function (response) { vm.exampleIngredients = vm.transformIngredient(response); });
            // vm.searchPurposeWithoutIngredient(evt);
        };
        vm.getExample = function getExample(query, input) {
            if (query == null || input == null) {
                return {};
            }
            return getExampleSanitized(query, input);
        };
        function getExampleSanitized(query, input) {
            var indexOfQuery = input.toLowerCase().indexOf(query.toLowerCase());
            if (indexOfQuery === -1) {
                return {'value': query, 'example': null};
            }
            var fullText = getFullTextFromInput(query, input, indexOfQuery);
            var example = getSampleTextFromInput(query, input, indexOfQuery, fullText.length);
            console.log({'query': query, 'input': input});
            console.log({'value': fullText, 'example': example});
            return {'value': fullText.toLowerCase(), 'example': example};
        }
        function getSampleTextFromInput(query, input, indexOfQuery, fullTextLength) {
            var startIndex = indexOfQuery - 25;
            var endIndex = indexOfQuery + 25 + fullTextLength;
            if (startIndex < 0) {
                startIndex = 0;
            }
            else {
                while (startIndex > 0 && input[startIndex - 1] !== ' ') {
                    startIndex--;
                }
            }
            if (endIndex >= input.length) {
                endIndex = input.length;
            }
            else {
                while (endIndex < input.length && input[endIndex] !== ' ') {
                    endIndex++;
                }
            }
            return input.substring(startIndex, endIndex);
        }
        function getFullTextFromInput(query, input, indexOfQuery) {
            var i = indexOfQuery + query.length;
            var fullText = query;
            while (input.length > i && input[i] !== ' ') {
                fullText += input[i++];
            }
            return fullText;
        }

        vm.transformPurpose = function(data) {
            var result = [];
            var query = data.meta.query[0];
            if (!data.results) {
                return result;
            }
            data.results.forEach(function(element) {
                var v = vm.getExample(query, element.purpose);
                if (v.example) {
                    result.push(v);
                }
            }, this);
            return result;
        };
        vm.transformIngredient = function(data) {
            var result = [];
            var query = data.meta.query[0];
            if (!data.results) {
                return result;
            }
            data.results.forEach(function(element) {
                /* jshint -W106 */ // comes from FDA dataset
                var v = vm.getExample(query, element.generic_name);
                if (v.example) {
                    result.push(v);
                }
                v = vm.getExample(query, element.inactive_ingredient);
                /* jshint +W106 */ // comes from FDA dataset
                if (v.example) {
                    result.push(v);
                }
            }, this);
            return result;
        };
    }
})();
