/// <reference path="../../../../vendortypescripts/angularjs/angular.d.ts"/>
(function () {
    'use strict';

    angular
        .module('app.core', [
        'ngAnimate', 'ngSanitize', 'blocks.router',
        'ui.router'
    ]);
})();
