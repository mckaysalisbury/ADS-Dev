/// <reference path="../../../../vendortypescripts/angularjs/angular.d.ts"/>
(function () {
    'use strict';

    angular
        .module('app.admin')
        .controller('AdminController', AdminController);

    /* @ngInject */
    function AdminController() {
        var vm = this;
        vm.title = 'Admin';
    }
})();
