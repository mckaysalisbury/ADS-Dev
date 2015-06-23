/// <reference path="../../../../typings/angularjs/angular.d.ts"/>
(function() {
    'use strict';

    angular
        .module('app.products')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'products',
                config:{
                    url: '/products',
                    controller: 'ProductsController',
                    controllerAs: 'vm',
                    templateUrl: 'app/products/products.html',
                    title: 'Products',
                }
            }
        ];
    }
})();
