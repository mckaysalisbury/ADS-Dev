/// <reference path="../../../../typings/angularjs/angular.d.ts"/>
(function () {
    'use strict';
    angular
        .module('app.layout')
        .controller('ShellController', ShellController);

    ShellController.$inject = ['$rootScope', '$timeout', 'config', 'logger'];
    /* @ngInject */
    function ShellController($rootScope, $timeout, config) {
        var vm = this;
        vm.isAlertOpen = true;
        $rootScope.showSplash = true;
        vm.navline = {
            title: config.appTitle,
            text: 'About',
            link: '/about',
        };
    }
})();
