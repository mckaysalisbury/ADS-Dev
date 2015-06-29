/* jshint -W117, -W030 */
describe('SearchFormController', function () {
    var controller;

    beforeEach(function () {
        module('app.search-form', 'app.search-by-purpose');
        bard.inject('$controller', '$rootScope', '$state', 'searchformservice');
    });

    beforeEach(function () {
        controller = $controller('SearchFormController');
        $rootScope.$apply();
    });

    bard.verifyNoOutstandingHttpRequests();

    describe('constructor', function () {

        beforeEach(function () {
            searchformservice.query = '';
            searchformservice.id = '';
        });

        it('should go to search-form.search-by-purpose', function () {
            $rootScope.$apply();
            expect($state.is('search-form.search-by-purpose'));
        });

        it('return false for canGoToProducts', function () {
            expect(controller.canGoToProducts()).to.equal(false);
        });

        it('return false for canGoToProduct', function () {
            expect(controller.canGoToProduct()).to.equal(false);
        });
    });

    describe('search form service has all values', function () {

        beforeEach(function () {
            searchformservice.query = 'querytest';
            searchformservice.id = 'idtest';
        });
        
        it('return true for canGoToProducts', function () {
            expect(controller.canGoToProducts()).to.equal(true);
        });


        it('return true for canGoToProduct', function () {
            expect(controller.canGoToProduct()).to.equal(true);
        });
    });
});
