(function() {
    'use strict';

    angular
        .module('app.product')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'about',
                config:{
                    url: '/about',
                    controller: 'AboutController',
                    controllerAs: 'vm',
                    templateUrl: 'app/about/about.html',
                    title: 'About',
                }
            }
        ];
    }
})();
