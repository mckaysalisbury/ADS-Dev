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
                state: 'product',
                config:{
                    url: '/product',
                    controller: 'ProductController',
                    controllerAs: 'vm',
                    templateUrl: 'app/product/product.html',
                    title: 'Product',
                }
            }
        ];
    }
})();
