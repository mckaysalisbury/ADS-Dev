/* jshint -W117, -W030 */   
describe('SearchController', function () {
    var controller;

    beforeEach(function () {
        bard.appModule('app.search');
        bard.inject('$controller', '$log', '$q', '$rootScope');
    });

    beforeEach(function () {
        controller = $controller('SearchController');
        $rootScope.$apply();
    });

    bard.verifyNoOutstandingHttpRequests();

    describe('typeahead', function () {

        describe('getExample', function () {
            it('should return no data when no data is passed', function () {
                expect(controller.getExample(null, null)).to.be.empty;
            });
            
            it('should exact value and exact example when only that is passed', function () {
                var result = controller.getExample('test', 'test');
                expect(result["value"]).to.equal('test');
                expect(result["example"]).to.equal('test');
            });
            
            it('should include full word when only only passed a piece', function () {
                var result = controller.getExample('tes', 'test');
                expect(result["value"]).to.equal('test');
                expect(result["example"]).to.equal('test');
            });
            
            
            it('should include full word when only only passed a piece but has additional content', function () {
                var result = controller.getExample('tes', 'test 123');
                expect(result["value"]).to.equal('test');
                expect(result["example"]).to.equal('test 123');
            });
            
            it('should include 25 characters on either side plus words on both sides', function () {
                var result = controller.getExample('blah', 'This is a test the should contain a lot of text in order to find out that blah is included and plenty of text on either side is also included.');
                expect(result["value"]).to.equal('blah');
                expect(result["example"]).to.equal('in order to find out that blah is included and plenty of');
            });
        });
    });
});
