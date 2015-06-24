(function () {
    'use strict';

    angular
        .module('app.core', [
        'ngAnimate', 'ngSanitize',
        'blocks.exception', 'blocks.logger', 'blocks.router',
        'ui.router'])
        .factory('searchformservice', SearchFormService);

    function SearchFormService() {
        var query = 'hello';
        return {
            getQuery: function () {
                return query;
            },
            setQuery: function (newVal) {
                query = newVal;
            }
        };
    }
})();
