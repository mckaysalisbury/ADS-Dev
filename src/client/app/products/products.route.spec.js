/* jshint -W117, -W030 */
describe('products routes', function () {
    describe('state', function () {
        var controller;
        var view = 'app/products/products.html';

        beforeEach(function() {
            module('app.products', bard.fakeToastr);
            bard.inject('$httpBackend', '$location', '$rootScope', '$state', '$templateCache');
        });

        beforeEach(function() {
            $templateCache.put(view, '');
        });

        bard.verifyNoOutstandingHttpRequests();

        it('should map state products to url /products ', function() {
            expect($state.href('search-form.products', {})).to.equal('/products');
        });

        it('should map /search-form.products route to product View template', function () {
            expect($state.get('search-form.products').templateUrl).to.equal(view);
        });

        it('of search-form.products should work with $state.go', function () {
            $state.go('search-form.products');
            $rootScope.$apply();
            expect($state.is('search-form.products'));
        });
    });
});
