(function() {
    'use strict';

    angular
        .module('app.search-form')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'search-form',
                config: {
                    url: '/',
                    templateUrl: 'app/search-form/search-form.html',
                    controller: 'SearchFormController',
                    controllerAs: 'vm',
                    title: 'Search Form'
                },
            }
        ];
    }
})();
