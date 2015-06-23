/// <reference path="../../../../typings/angularjs/angular.d.ts"/>
(function () {
    'use strict';

    var core = angular.module('app.core');

    var config = {
        appErrorPrefix: '[S.H.I.E.L.D. Error] ',
        appTitle: 'S.H.I.E.L.D.'
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
