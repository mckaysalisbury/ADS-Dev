(function() {
    'use strict';

    angular
        .module('app.searchByPurpose')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'search-form.searchByPurpose',
                config: {
                    url: '/searchbypurpose',
                    templateUrl: 'app/searchByPurpose/searchByPurpose.html',
                    controller: 'SearchByPurposeController',
                    controllerAs: 'vm',
                    title: 'Search By Purpose',
                    settings: {
                        nav: 3,
                        content: '<i class="fa fa-search"></i> Search By Purpose'
                    }
                },
            }
        ];
    }
})();
