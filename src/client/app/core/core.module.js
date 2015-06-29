(function () {
    'use strict';

    angular
        .module('app.core', [
        'ngAnimate', 'ngSanitize',
        'blocks.exception', 'blocks.logger', 'blocks.router',
        'ui.router', 'flock.bootstrap.material'])
        .factory('searchformservice', SearchFormService);

    function SearchFormService() {
        var query = '';
        var purpose = '';
        var ingredient = '';
        return {
            getQuery: function () {
                return query;
            },
            setQuery: function (newQuery) {
                query = newQuery;
            },

            getPurpose: function () {
                return 'purpose';
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
