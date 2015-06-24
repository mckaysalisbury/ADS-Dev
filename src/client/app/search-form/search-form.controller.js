/* jshint -W117, -W030, -W074 */
(function () {
    'use strict';

    angular
        .module('app.search-form')
        .controller('SearchFormController', SearchFormController);

    SearchFormController.$inject = ['$http'];
    /* @ngInject */
    function SearchFormController($http) {
        var vm = this;
        vm.formData = {};
        vm.processForm = function () {
            alert('awesome!');
        };
    }
})();
