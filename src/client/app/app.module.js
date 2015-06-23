/// <reference path="../../../vendortypescripts/angularjs/angular.d.ts"/>
(function () {
    'use strict';

    angular.module('app', [
        'app.core',
        'app.widgets',
        'app.admin',
        'app.dashboard',
        'app.layout',
        'app.search',
        'app.searchByPurpose'
    ]);
})();
