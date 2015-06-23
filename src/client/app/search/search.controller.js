/* jshint -W117, -W030, -W074 */
(function () {
    'use strict';

    angular
        .module('app.search')
        .controller('SearchController', SearchController);

    SearchController.$inject = ['$http'];
    /* @ngInject */
    function SearchController($http) {
        var vm = this;
        vm.filterOptions = { filterText: '', };

        vm.havingIngredientsGrid = { data: 'vm.drugsContaining',
                                     filterOptions: vm.filterOptions };

        vm.filterNephi = function () {
            var filterText = 'name:Nephi';
            if (vm.filterOptions.filterText === '') {
                vm.filterOptions.filterText = filterText;
            }
            else if (vm.filterOptions.filterText === filterText) {
                vm.filterOptions.filterText = '';
            }
        };

        vm.searchPurposeWithoutIngredient = function (evt) {
            $http.get('/data/purposeWithoutIngredient/' + vm.purpose + '/' + vm.ingredient)
                .success(function (response) { vm.drugsContaining = response.results; });
        };

        vm.productSearch = function(evt) {
            $http.get('/data/products/' + vm.productName)
                 .success(function (response) {vm.products = response.results;});
        };

        vm.gridOptions = { data: 'vm.products', filterOptions: vm.filterOptions,
            enablePaging: true
        //pagingOptions: $scope.pagingOptions,
             };
        vm.getExample = function getExample(query, input) {
             if (query == null || input == null) {
                 return {};
             }
             var indexOfQuery = input.toLowerCase().indexOf(query.toLowerCase());
             if (indexOfQuery === -1) {
                 return {'value': query, 'example': ''};
             }
             var i = indexOfQuery + query.length;
             var fullText = query;
             while (input.length > i && input[i] !== ' ') {
                 fullText += input[i++];
             }
             var startIndex = indexOfQuery - 25;
             var endIndex = indexOfQuery + 25 + fullText.length;
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
             var example = input.substring(startIndex, endIndex);
             //  console.log({'query': query, 'input': input});
             //  console.log({'value': fullText, 'example': example});
             return {'value': fullText, 'example': example};
         };

        var bestPictures = new Bloodhound({
            datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            remote: {
                url: '../data/purposeWithQuery/%QUERY',
                wildcard: '%QUERY',
                filter: function(data) {
                    var result = [];
                    var query = data.q;
                    if (!data.d.results) {
                        return result;
                    }
                    data.d.results.forEach(function(element) {
                    result.push(vm.getExample(query, element.purpose));
                }, this);
                    return result;
                }
            }
        });

        $('#purposeInput').typeahead(null, {
            name: 'purposes',
            display: 'value',
            source: bestPictures,
            limit:10,
            templates: {
                empty: [
                  '<div class="empty-message">',
                    'Unable to find any purposes that match your search.',
                  '</div>'
                ].join('\n'),
                suggestion: function(data) {
                    return '<p><strong>' + data.value + '</strong> - ' + data.example + '</p>';
                }
            }
        });
    }
})();
