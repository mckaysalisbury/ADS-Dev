(function () {
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
                config: {
                    url: '/products',
                    controller: 'ProductsController',
                    controllerAs: 'vm',
                    templateUrl: 'app/products/products.html',
                    title: 'Products',
                }
            },
            {
                state: 'products.with',
                config: {
                    url: 'with',
                    templateUrl: 'app/products/with.html',
                    title: 'Products',
                }
            },
            {
                state: 'products.without',
                config: {
                    url: 'without',
                    templateUrl: 'app/products/without.html',
                    title: 'Products',
                }
            },
        ];
    }
})();
