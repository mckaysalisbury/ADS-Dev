/// <reference path="../../../../vendortypescripts/angularjs/angular.d.ts"/>
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
                state: 'searchByPurpose',
                config: {
                    url: '/searchByPurpose',
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
