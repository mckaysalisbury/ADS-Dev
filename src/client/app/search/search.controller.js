(function () {
    'use strict';

    angular
        .module('app.search')
        .controller('SearchController', SearchController);



    SearchController.$inject = ['$http'];
    /* @ngInject */
    function SearchController($http) {
        var vm = this;
        $http.get('/data/substances')
            .success(function (response) {
                 vm.names = response.results;
                  });
    }
})();
