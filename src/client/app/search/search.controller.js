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
             
             //purposeInput
         var bestPictures = new Bloodhound({
          datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
          queryTokenizer: Bloodhound.tokenizers.whitespace,
          remote: {
            url: '../data/purposeWithQuery/%QUERY',
            wildcard: '%QUERY',
            filter: function(data){
                console.log(data);
                // var result = [];
                // var query = data.q;
                // data.d.results.forEach(function(element) {
                //     result.push({"value": query, "example": element.purpose});
                // }, this);
                // return result;
                return data;
            }
          }
        });
         
        $('#purposeInput').typeahead(null, {
          name: 'purposes',
          display: 'value', 
          source: bestPictures,
          templates: {
            empty: [
              '<div class="empty-message">',
                'unable to find any Best Picture winners that match the current query',
              '</div>'
            ].join('\n'),
            suggestion: function(data){
      return '<p><strong>' + data.value + '</strong> - ' + data.example + '</p>';
    }
          }
        });
    }
})();
