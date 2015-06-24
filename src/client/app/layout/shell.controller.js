/// <reference path="../../../../vendortypescripts/angularjs/angular.d.ts"/>
(function () {
    'use strict';
    angular
        .module('app.layout')
        .controller('ShellController', ShellController);

    ShellController.$inject = ['$rootScope', '$timeout', 'config', 'logger'];
    /* @ngInject */
    function ShellController($rootScope, $timeout, config) {
        var vm = this;
        //vm.busyMessage = 'Please wait ...';
        //vm.isBusy = true;
        $rootScope.showSplash = true;
        vm.navline = {
            title: config.appTitle,
            text: 'About',
            link: '/about',
        };
        hideSplash();
        function hideSplash() {
            //Force a .3 second delay so we can see the splash.
            $timeout(function () {
                $rootScope.showSplash = false;
            }, 300);
        }
    }
})();
