(function () {
    'use strict';

    angular
        .module('app.search-by-purpose')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'search-by-purpose',
                config: {
                    url: '/',
                    templateUrl: 'app/search-by-purpose/search-by-purpose.html',
                    controller: 'SearchByPurposeController',
                    controllerAs: 'vm',
                    title: 'Search By Purpose',
                    settings: {
                        nav: 3,
                        content: '<i class="fa fa-search"></i> Search By Purpose'
                    }
                }
            }
        ];
    }
})();
