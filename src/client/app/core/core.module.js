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
        var purpose = 'WHello';
        var ingredient = ' ';
        return {
            getQuery: function () {
                return query;
            },
            setQuery: function (newQuery) {
                query = newQuery;
            },

            getPurpose: function () {
                return 'he';
            },

            setPurpose: function (newPurpose) {
                purpose = newPurpose;
            },

            getIngredient: function (newIngredient) {
                ingredient = newIngredient;
            }
        };
    }
})();
