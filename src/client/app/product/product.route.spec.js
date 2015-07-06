/* jshint -W117, -W030 */
describe('product routes', function () {
    describe('state', function () {
        var controller;
        var view = 'app/product/product.html';

        beforeEach(function() {
            module('app.product', bard.fakeToastr);
            bard.inject('$httpBackend', '$location', '$rootScope', '$state', '$templateCache');
        });

        beforeEach(function() {
            $templateCache.put(view, '');
        });

        bard.verifyNoOutstandingHttpRequests();

        it('should map state product to url /product ', function() {
            expect($state.href('product', {})).to.equal('/product');
        });

        it('should map /search-form.product route to product View template', function () {
            expect($state.get('product').templateUrl).to.equal(view);
        });

        it('of search-form.product should work with $state.go', function () {
            $state.go('product');
            $rootScope.$apply();
            expect($state.is('product'));
        });
    });
});
