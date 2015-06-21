(function () {
    'use strict';

    var core = angular.module('app.core');

    var config = {
        appErrorPrefix: '[Hackathon Error] ',
        appTitle: 'Hackathon'
    };

    core.value('config', config);

    core.config(configure);

    configure.$inject = ['$logProvider', 'routerHelperProvider'];
    /* @ngInject */
    function configure($logProvider, routerHelperProvider) {
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }
        routerHelperProvider.configure({docTitle: config.appTitle + ': '});
    }

})();
