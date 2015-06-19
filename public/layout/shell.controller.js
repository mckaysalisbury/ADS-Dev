(function() {
    'use strict';

    angular
        .module([])
        .controller('ShellController', ShellController);

    ShellController.$inject = ['$rootScope', '$timeout'];
    /* @ngInject */
    function ShellController($rootScope, $timeout) {
        var vm = this;
        vm.busyMessage = 'Please wait ...';
        vm.isBusy = true;
        vm.name = 'Leo lololz';
    }
})();
