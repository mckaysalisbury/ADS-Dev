(function () {
    'use strict';

    angular
        .module('app.core', [
        'ngAnimate', 'ngSanitize',
        'blocks.exception', 'blocks.logger', 'blocks.router',
        'ui.router', 'ngMaterial']).config(function ($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('blue')
            .accentPalette('pink');
    })
        .factory('searchformservice', SearchFormService);

    function SearchFormService() {
        var query = '';
        var purposes = [];
        var ingredients = [];
        return {
            getQuery: function () {
                return query;
            },
            setQuery: function (newQuery) {
                query = newQuery;
            },

            getPurposes: function () {
                return purposes;
            },

            setPurposes: function (newPurposes) {
                purposes = newPurposes;
            },

            getIngredients: function () {
                return ingredients;
            },

            setIngredients: function (newIngredients) {
                ingredients = newIngredients;
            },
        };
    }
})();
