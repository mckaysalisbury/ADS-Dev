(function() {
    'use strict';
    angular
        .module(['app.layout'])
        .controller('ShellController', ShellController);

    ShellController.$inject = ['$rootScope', '$timeout','config'];
    /* @ngInject */
    function ShellController($rootScope, $timeout, config) {
       var vm = this;
        //vm.busyMessage = 'Please wait ...';
        //vm.isBusy = true;
        $rootScope.showSplash = true;
        vm.navline = {
            title: config.appTitle,
            text: 'Open FDA',
        };
        hideSplash();
        
         function hideSplash() {
            //Force a 1 second delay so we can see the splash.
            $timeout(function() {
                $rootScope.showSplash = false;
            }, 300);
        }
    }
})();
